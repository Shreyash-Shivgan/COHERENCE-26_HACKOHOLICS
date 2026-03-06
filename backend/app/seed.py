"""
Seed script — populates the database with realistic Indian government budget data.
Uses the same deterministic seeded-random logic as the frontend's indiaData.ts so data matches.
"""

from sqlalchemy.orm import Session
from app.models.project_model import Project
from app.models.anomaly import Anomaly
import os
import csv
from datetime import datetime

# ── Same taxonomy as the frontend ─────────────────────────────────────

DEPARTMENTS = [
    "Ministry of Health & Family Welfare",
    "Ministry of Rural Development",
    "Ministry of Education",
    "Ministry of Housing & Urban Affairs",
    "Ministry of Road Transport & Highways",
    "Ministry of Jal Shakti",
    "Ministry of Agriculture & Farmers Welfare",
]

SCHEMES_BY_DEPT = {
    "Ministry of Health & Family Welfare":       ["Ayushman Bharat – PM-JAY", "National Health Mission", "PM Swasthya Suraksha Yojana"],
    "Ministry of Rural Development":             ["PMGSY", "MGNREGS", "PM Awaas Yojana (Gramin)", "DEEN DAYAL Upadhyaya Grameen Kaushalya Yojana"],
    "Ministry of Education":                     ["PM POSHAN", "Samagra Shiksha Abhiyan", "Pradhan Mantri Uchchatar Shiksha Protsahan"],
    "Ministry of Housing & Urban Affairs":       ["PM Awaas Yojana (Urban)", "Smart Cities Mission", "Swachh Bharat Mission (Urban)"],
    "Ministry of Road Transport & Highways":     ["Bharatmala Pariyojana", "PMGSY Urban", "National Highways Development Project"],
    "Ministry of Jal Shakti":                    ["Jal Jeevan Mission", "AMRUT 2.0", "Swachh Bharat Mission (Gramin)"],
    "Ministry of Agriculture & Farmers Welfare": ["PM Kisan Samman Nidhi", "PM Fasal Bima Yojana", "Pradhan Mantri Krishi Sinchai Yojana"],
}

VENDORS = [
    "ABC Infrastructure Ltd",
    "XYZ Construction Pvt Ltd",
    "GreenBuild Solutions",
    "NovaTech Contractors",
    "Bharat Road Works",
    "HealthFirst Medical Infrastructure",
    "AquaFlow Engineers",
    "EduBuild India",
    "UrbanHomes Developers",
    "AgroPath Pvt Ltd",
]

PROJECT_NAME_TEMPLATES = [
    "{district} Rural Road Development Phase {n}",
    "{district} District Hospital Expansion",
    "{district} Smart School Infrastructure",
    "{district} Water Pipeline Project",
    "{district} Urban Housing Complex Block {n}",
    "{district} Primary Health Centre Upgrade",
    "{district} Skill Development Centre",
    "{district} Watershed Management Project",
    "{district} Solar Street Lighting Scheme",
    "{district} Anganwadi Renovation Phase {n}",
    "{district} Irrigation Canal Extension",
    "{district} NH Bypass Construction",
]

STATUSES = ["Ongoing", "Completed", "Delayed", "Cancelled"]

# Key states/districts to seed (matching frontend defaults)
SEED_LOCATIONS = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    "Delhi": ["New Delhi", "South Delhi", "East Delhi"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
}

ANOMALY_TEMPLATES = [
    {
        "type": "Verification Mismatch",
        "severity": "High",
        "desc_template": '{vendor} has marked "{name}" as 100% complete. {tickets}+ citizen tickets raised in the last 48 hours reporting incomplete work and debris at site in {district}.',
    },
    {
        "type": "Abnormal Allocation Spike",
        "severity": "Medium",
        "desc_template": 'Historical 5-year average budget for this scheme was ₹{hist}L/year. Current fiscal year allocation spiked to ₹{current}L without corresponding project proposals.',
    },
    {
        "type": "Fund Idling",
        "severity": "Low",
        "desc_template": 'Funds disbursed {months} months ago for "{name}" have only {util_pct}% utilization rate. Deadline approaching with no work commencement.',
    },
    {
        "type": "Duplicate Disbursement",
        "severity": "High",
        "desc_template": 'Two disbursement records detected for the same work order under "{name}". Total duplicate amount flagged: ₹{dup_amt}L. Vendor: {vendor}.',
    },
    {
        "type": "Contractor Non-Performance",
        "severity": "Medium",
        "desc_template": '{vendor} has received {spent}L in milestone payments for "{name}" but field verification shows only {phys_pct}% physical completion.',
    },
]

ANOMALY_STATUSES = ["Investigating", "Flagged for Audit", "Warning Issued"]
ANOMALY_DATES = ["2024-10-24", "2024-10-22", "2024-10-20", "2024-10-18", "2024-10-15", "2024-10-10"]


def _seed(s: str) -> int:
    """Same deterministic hash as the frontend."""
    h = 0
    for ch in s:
        h = (31 * h + ord(ch)) & 0xFFFFFFFF
    return h


def _pick(arr, s):
    return arr[s % len(arr)]


def seed_database(db: Session):
    """Populate the database with realistic project and anomaly data."""
    # Skip if data already exists
    if db.query(Project).first() is not None:
        print("Database already seeded — skipping.")
        return

    try:
        csv_path = os.path.join(os.path.dirname(__file__), "ml", "data", "final_data.csv.csv")
        if os.path.exists(csv_path):
            _seed_from_csv(db, csv_path)
        else:
            _do_seed(db)
    except Exception as e:
        db.rollback()
        print(f"⚠ Seed failed: {e}")


def _convert_date_format(date_str: str) -> str:
    """Safely convert DD-MM-YYYY to YYYY-MM-DD. Handle empty/invalid dates."""
    if not date_str:
        return "2024-01-01"
    try:
        dt = datetime.strptime(date_str, "%d-%m-%Y")
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        return "2024-01-01"


def _seed_from_csv(db: Session, csv_path: str):
    print(f"Reading seed data from {csv_path}...")
    project_counter = 0
    anomaly_counter = 0
    
    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # We skip some rows to keep the DB size manageable, or load all
            # Load first 300 to be safe on DB size and speed
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
            
            start_date = _convert_date_format(row.get("project_start_date", ""))
            
            # Decide end date based on status
            if p_status == "Completed":
                end_date = _convert_date_format(row.get("actual_completion", ""))
            else:
                end_date = _convert_date_format(row.get("expected_completion", ""))
            
            # Predict anomaly: high complaints or delayed
            complaints = int(row.get("citizen_complaints", "0"))
            veri = row.get("completion_verified", "Yes")
            rating = float(row.get("citizen_rating", "5.0"))
            
            anomaly_flag = False
            if (p_status == "Delayed" and complaints > 150) or (veri == "No" and rating < 2.5):
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
            db.flush() # flush to get project_id
            
            project_counter += 1
            
            if anomaly_flag or (project_counter % 12 == 0 and p_status == "Delayed"):
                anomaly_counter += 1
                
                # Pick a random anomaly template
                k = f"proj-{proj.project_id}"
                tmpl = _pick(ANOMALY_TEMPLATES, _seed(k + "tmpl"))
                a_status = _pick(ANOMALY_STATUSES, _seed(k + "astatus"))
                
                util_pct = round((proj.utilized_amount / max(proj.project_budget, 1)) * 100)
                
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

    db.commit()
    print(f"✅ Seeded {project_counter} projects and {anomaly_counter} anomalies from CSV.")


def _do_seed(db: Session):
    """Internal seeding logic."""

    project_counter = 0
    all_projects = []

    for state, districts in SEED_LOCATIONS.items():
        for district in districts:
            key = f"{state}-{district}"
            count = (_seed(key + "count") % 6) + 7  # 7-12 projects per location
            start_years = ["2022", "2023", "2024"]

            for i in range(count):
                k = f"{key}-proj-{i}"
                dept = _pick(DEPARTMENTS, _seed(k + "d"))
                schemes = SCHEMES_BY_DEPT[dept]
                scheme = _pick(schemes, _seed(k + "s"))
                vendor = _pick(VENDORS, _seed(k + "v"))
                status = _pick(STATUSES, _seed(k + "st"))
                allocated = ((_seed(k + "a") % 900) + 50) * 100000

                if status == "Completed":
                    util_pct = 0.95 + (_seed(k + "u") % 5) / 100
                elif status == "Cancelled":
                    util_pct = 0.1 + (_seed(k + "u") % 20) / 100
                elif status == "Delayed":
                    util_pct = 0.3 + (_seed(k + "u") % 30) / 100
                else:
                    util_pct = 0.5 + (_seed(k + "u") % 40) / 100

                start_yr = _pick(start_years, _seed(k + "sy"))
                start_mo = str((_seed(k + "sm") % 12) + 1).zfill(2)
                end_yr = str(int(start_yr) + 1 + (_seed(k + "ey") % 2))
                end_mo = str((_seed(k + "em") % 12) + 1).zfill(2)

                tmpl = _pick(PROJECT_NAME_TEMPLATES, _seed(k + "nm"))
                name = (
                    tmpl
                    .replace("{district}", district)
                    .replace("{n}", str((_seed(k + "ph") % 3) + 1))
                )

                anomaly_flag = _seed(k + "flag") % 5 == 0

                project_counter += 1
                proj = Project(
                    project_name=name,
                    project_type=scheme,
                    project_budget=allocated,
                    project_status=status,
                    department=dept,
                    scheme=scheme,
                    vendor=vendor,
                    state=state,
                    district=district,
                    utilized_amount=round(allocated * util_pct),
                    start_date=f"{start_yr}-{start_mo}-01",
                    end_date=f"{end_yr}-{end_mo}-30",
                    anomaly_flag=anomaly_flag,
                )
                db.add(proj)
                all_projects.append(proj)

    db.flush()

    # Create anomalies for flagged and delayed projects
    anomaly_counter = 0
    for proj in all_projects:
        if not (proj.anomaly_flag or proj.project_status == "Delayed"):
            continue

        k = f"proj-{proj.project_id}"
        tmpl = _pick(ANOMALY_TEMPLATES, _seed(k + "tmpl"))
        a_status = _pick(ANOMALY_STATUSES, _seed(k + "astatus"))

        util_pct = round((proj.utilized_amount / max(proj.project_budget, 1)) * 100)

        desc = tmpl["desc_template"].format(
            vendor=proj.vendor,
            name=proj.project_name,
            tickets=(_seed(k + "tickets") % 40) + 10,
            district=proj.district,
            hist=(_seed(k + "hist") % 20) + 5,
            current=round(proj.project_budget / 100000),
            months=(_seed(k + "months") % 5) + 3,
            util_pct=util_pct,
            dup_amt=round(proj.project_budget * 0.3 / 100000),
            spent=round(proj.utilized_amount / 100000),
            phys_pct=round(util_pct * 0.6),
        )

        anomaly_counter += 1
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

    db.commit()
    print(f"✅ Seeded {project_counter} projects and {anomaly_counter} anomalies across {len(SEED_LOCATIONS)} states.")
