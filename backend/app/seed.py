"""
Seed script — populates the database with realistic Indian government budget data.
Uses budget_results_with_risk_scores.csv from the ML pipeline for real data.
"""

from sqlalchemy.orm import Session
from app.models.project_model import Project
from app.models.anomaly import Anomaly
from app.models.budget_model import Budget
from app.models.complaint_model import Complaint
import os
import csv
from datetime import datetime


ANOMALY_TEMPLATES = [
    {
        "type": "Verification Mismatch",
        "severity": "High",
        "desc_template": '{vendor} has marked "{name}" as 100% complete. {tickets}+ citizen tickets raised reporting incomplete work in {district}.',
    },
    {
        "type": "Abnormal Allocation Spike",
        "severity": "Medium",
        "desc_template": 'Historical average budget for this scheme was ₹{hist}L/year. Current fiscal spiked to ₹{current}L without proposals.',
    },
    {
        "type": "Fund Idling",
        "severity": "Low",
        "desc_template": 'Funds disbursed {months} months ago for "{name}" have only {util_pct}% utilization. Deadline approaching.',
    },
    {
        "type": "Duplicate Disbursement",
        "severity": "High",
        "desc_template": 'Two disbursement records detected for "{name}". Duplicate amount flagged: ₹{dup_amt}L. Vendor: {vendor}.',
    },
    {
        "type": "Contractor Non-Performance",
        "severity": "Medium",
        "desc_template": '{vendor} received {spent}L for "{name}" but field verification shows only {phys_pct}% completion.',
    },
]

ANOMALY_STATUSES = ["Investigating", "Flagged for Audit", "Warning Issued"]
ANOMALY_DATES = ["2024-10-24", "2024-10-22", "2024-10-20", "2024-10-18", "2024-10-15", "2024-10-10"]


def _seed(s: str) -> int:
    h = 0
    for ch in s:
        h = (31 * h + ord(ch)) & 0xFFFFFFFF
    return h


def _pick(arr, s):
    return arr[s % len(arr)]


def _convert_date_format(date_str: str) -> str:
    if not date_str:
        return "2024-01-01"
    try:
        dt = datetime.strptime(date_str, "%d-%m-%Y")
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        return "2024-01-01"


def seed_database(db: Session):
    """Populate the database with realistic project and anomaly data."""
    if db.query(Project).first() is not None:
        print("Database already seeded — skipping.")
        return

    try:
        csv_path = os.path.join(os.path.dirname(__file__), "ml", "data", "budget_results_with_risk_scores.csv")
        if os.path.exists(csv_path):
            _seed_from_csv(db, csv_path)
        else:
            print("⚠ CSV data file not found. No seed data loaded.")
    except Exception as e:
        db.rollback()
        print(f"⚠ Seed failed: {e}")


def _seed_from_csv(db: Session, csv_path: str):
    print(f"Reading seed data from {csv_path}...")

    try:
        from app.ml.prediction_model import predict, ML_FEATURES
        use_ml = True
    except ImportError:
        print("ML dependencies not available. Using CSV risk_label column instead.")
        use_ml = False

    project_counter = 0
    anomaly_counter = 0
    complaint_counter = 0
    budgets_dict = {}

    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if project_counter >= 300:
                break

            city = row.get("city", "Unknown")
            proj_type = row.get("project_type", "Project")
            p_name = f"{city} {proj_type}"

            p_budget_str = row.get("project_budget", "0")
            p_budget = float(p_budget_str) if p_budget_str else 0.0

            p_status = row.get("project_status", "Ongoing")

            dept = row.get("central_ministry", "")
            scheme = row.get("central_scheme", "")
            vendor = row.get("vendor_name", "")
            state = row.get("state", "")
            district = row.get("district", "")

            spent_str = row.get("spent_amount", "0")
            spent = float(spent_str) if spent_str else 0.0

            # Aggregate budgets dynamically
            b_key = (dept, state, district)
            if b_key not in budgets_dict:
                budgets_dict[b_key] = {"alloc": 0.0, "spent": 0.0}
            budgets_dict[b_key]["alloc"] += p_budget
            budgets_dict[b_key]["spent"] += spent

            start_date = _convert_date_format(row.get("project_start_date", ""))

            if p_status == "Completed":
                end_date = _convert_date_format(row.get("actual_completion", ""))
            else:
                end_date = _convert_date_format(row.get("expected_completion", ""))

            # Determine anomaly flag
            anomaly_flag = False
            if use_ml:
                features = []
                for feat in ML_FEATURES:
                    val = row.get(feat, "0")
                    if not val:
                        val = "0"
                    features.append(float(val))
                res = predict(features)
                risk_level = res.get("risk_level", "LOW")
                if risk_level == "HIGH":
                    anomaly_flag = True
            else:
                # Fallback: use final_risk_label from CSV if available
                risk_label = row.get("final_risk_label", "Low Risk")
                if "High" in risk_label:
                    anomaly_flag = True

            proj = Project(
                project_name=p_name,
                project_type=proj_type,
                project_budget=p_budget,
                project_status=p_status,
                department=dept,
                scheme=scheme,
                vendor=vendor,
                state=state,
                district=district,
                utilized_amount=spent,
                start_date=start_date,
                end_date=end_date,
                anomaly_flag=anomaly_flag,
            )
            db.add(proj)
            db.flush()

            # Seed complaints
            comp_str = row.get("citizen_complaints", "0")
            comp_val = int(float(comp_str)) if comp_str else 0
            seed_complaints = min(comp_val, 3)
            for c_idx in range(seed_complaints):
                complaint_counter += 1
                comp = Complaint(
                    project_id=proj.project_id,
                    project_name=proj.project_name,
                    department=proj.department,
                    scheme=proj.scheme,
                    vendor=proj.vendor,
                    issue_type="Poor Quality" if c_idx % 2 == 0 else "Delayed Start",
                    rating=int(float(row.get("citizen_rating", "3.0"))),
                    description=f"Citizen observation regarding {proj.project_name}. Please inspect the physical site.",
                    photo_count=0,
                    photos="[]",
                    reporter_name=f"Citizen_{proj.project_id}_{c_idx}",
                    reporter_phone="9999999999",
                    timestamp="2024-10-24T12:00:00Z",
                    review_status="Under Review"
                )
                db.add(comp)

            project_counter += 1

            if anomaly_flag or (project_counter % 12 == 0 and p_status == "Delayed"):
                anomaly_counter += 1

                k = f"proj-{proj.project_id}"
                tmpl = _pick(ANOMALY_TEMPLATES, _seed(k + "tmpl"))
                a_status = _pick(ANOMALY_STATUSES, _seed(k + "astatus"))

                util_pct = round((proj.utilized_amount / max(proj.project_budget, 1)) * 100)
                complaints = int(float(row.get("citizen_complaints", "0") or "0"))

                desc = tmpl["desc_template"].format(
                    vendor=proj.vendor,
                    name=proj.project_name,
                    tickets=complaints,
                    district=proj.district,
                    hist=(_seed(k + "hist") % 20) + 5,
                    current=round(proj.project_budget / 100000),
                    months=(_seed(k + "months") % 5) + 3,
                    util_pct=util_pct,
                    dup_amt=round(proj.project_budget * 0.3 / 100000),
                    spent=round(proj.utilized_amount / 100000),
                    phys_pct=round(util_pct * 0.6),
                )

                anomaly = Anomaly(
                    anomaly_id=f"ANM-2024-{anomaly_counter:04d}",
                    project_id=proj.project_id,
                    project_name=proj.project_name,
                    department=proj.department,
                    scheme=proj.scheme,
                    vendor=proj.vendor,
                    project_status=proj.project_status,
                    anomaly_type=tmpl["type"],
                    severity="High" if proj.anomaly_flag else tmpl["severity"],
                    status=a_status,
                    description=desc,
                    amount_at_risk=round(proj.project_budget * (0.2 + (_seed(k + "risk") % 50) / 100)),
                    date=_pick(ANOMALY_DATES, anomaly_counter),
                    district=proj.district,
                    state=proj.state,
                )
                db.add(anomaly)

    # Insert aggregated budgets
    for (m_dept, m_state, m_dist), vals in budgets_dict.items():
        b = Budget(
            ministry=m_dept,
            state=m_state,
            district=m_dist,
            allocated_amount=vals["alloc"],
            spent_amount=vals["spent"],
            year=2024
        )
        db.add(b)

    db.commit()
    print(f"✅ Seeded {project_counter} projects, {anomaly_counter} anomalies, {len(budgets_dict)} budgets, {complaint_counter} complaints.")
