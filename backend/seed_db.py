"""
Enhanced seed script with realistic data for testing all anomaly detection patterns.
Includes: 5 states, 12 districts, 4 schemes, 6 vendors, 20 projects,
citizen reports, and pre-seeded anomalies with deliberately anomalous data.
"""

from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import State, District, Scheme, Vendor, Project, CitizenReport, Anomaly
import datetime


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing data
    db.query(Anomaly).delete()
    db.query(CitizenReport).delete()
    db.query(Project).delete()
    db.query(Vendor).delete()
    db.query(Scheme).delete()
    db.query(District).delete()
    db.query(State).delete()
    db.commit()

    # ── States ────────────────────────────────────────────────────────
    states_data = ["Maharashtra", "Karnataka", "Uttar Pradesh", "Tamil Nadu", "Rajasthan"]
    states = {}
    for name in states_data:
        s = State(name=name)
        db.add(s)
        db.flush()
        states[name] = s

    # ── Districts ─────────────────────────────────────────────────────
    districts_data = {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Karnataka": ["Bangalore", "Mysuru"],
        "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur"],
        "Tamil Nadu": ["Chennai", "Coimbatore"],
        "Rajasthan": ["Jaipur", "Jodhpur"],
    }
    districts = {}
    for state_name, dist_names in districts_data.items():
        for dname in dist_names:
            d = District(name=dname, state_id=states[state_name].id)
            db.add(d)
            db.flush()
            districts[dname] = d

    # ── Schemes ───────────────────────────────────────────────────────
    schemes = {
        "PMAY": Scheme(ministry="Housing & Urban Affairs", scheme_name="PM Awas Yojana"),
        "MGNREGA": Scheme(ministry="Rural Development", scheme_name="MGNREGA"),
        "PMGSY": Scheme(ministry="Rural Development", scheme_name="PM Gram Sadak Yojana"),
        "SBM": Scheme(ministry="Jal Shakti", scheme_name="Swachh Bharat Mission"),
    }
    for s in schemes.values():
        db.add(s)
    db.flush()

    # ── Vendors ───────────────────────────────────────────────────────
    vendors = {
        "ABC": Vendor(vendor_name="ABC Constructions", registration_id="REG001", contact_email="abc@const.com"),
        "XYZ": Vendor(vendor_name="XYZ Infrastructure", registration_id="REG002", contact_email="xyz@infra.com"),
        "PQR": Vendor(vendor_name="PQR Builders", registration_id="REG003", contact_email="pqr@build.com"),
        "LMN": Vendor(vendor_name="LMN Contractors", registration_id="REG004", contact_email="lmn@contract.com"),
        "DEF": Vendor(vendor_name="DEF Engineering", registration_id="REG005", contact_email="def@eng.com"),
        "GHI": Vendor(vendor_name="GHI Road Works", registration_id="REG006", contact_email="ghi@road.com"),
    }
    for v in vendors.values():
        db.add(v)
    db.flush()

    now = datetime.datetime.utcnow()

    # ── Projects (diverse financial patterns) ─────────────────────────
    projects_data = [
        # Normal healthy project
        dict(name="Bridge Construction Mumbai", scheme="PMGSY", state="Maharashtra", district="Mumbai", vendor="ABC",
             central=1000000, state_recv=950000, dist_recv=920000, budget=900000, spent=720000,
             status="In Progress", start="2024-01-15", expected="2025-06-30"),

        # Severe underutilization
        dict(name="Housing Complex Pune", scheme="PMAY", state="Maharashtra", district="Pune", vendor="XYZ",
             central=2000000, state_recv=1800000, dist_recv=1700000, budget=1600000, spent=200000,
             status="In Progress", start="2023-06-01", expected="2024-12-31"),

        # Central-state leakage (20% gap)
        dict(name="Road Widening Nagpur", scheme="PMGSY", state="Maharashtra", district="Nagpur", vendor="PQR",
             central=1500000, state_recv=1200000, dist_recv=1150000, budget=1100000, spent=800000,
             status="In Progress", start="2024-03-01", expected="2025-09-30"),

        # Completed with high complaints (false completion)
        dict(name="Sanitation Drive Bangalore", scheme="SBM", state="Karnataka", district="Bangalore", vendor="LMN",
             central=800000, state_recv=750000, dist_recv=700000, budget=680000, spent=650000,
             status="Completed", start="2023-01-01", expected="2024-01-01", actual="2024-02-15",
             complaints=5, rating=1.5, verified=False),

        # Overspending
        dict(name="Rural Road Mysuru", scheme="MGNREGA", state="Karnataka", district="Mysuru", vendor="DEF",
             central=500000, state_recv=480000, dist_recv=450000, budget=400000, spent=500000,
             status="In Progress", start="2024-06-01", expected="2025-03-31"),

        # Heavily delayed project
        dict(name="Water Supply Lucknow", scheme="SBM", state="Uttar Pradesh", district="Lucknow", vendor="GHI",
             central=1200000, state_recv=1100000, dist_recv=1000000, budget=950000, spent=300000,
             status="In Progress", start="2022-01-01", expected="2023-06-30"),

        # Vendor monopoly pattern (ABC gets many projects in Mumbai)
        dict(name="Flyover Mumbai Phase 2", scheme="PMGSY", state="Maharashtra", district="Mumbai", vendor="ABC",
             central=3000000, state_recv=2800000, dist_recv=2600000, budget=2500000, spent=1800000,
             status="In Progress", start="2024-02-01", expected="2026-02-01"),
        dict(name="Metro Link Mumbai", scheme="PMGSY", state="Maharashtra", district="Mumbai", vendor="ABC",
             central=5000000, state_recv=4700000, dist_recv=4500000, budget=4300000, spent=2100000,
             status="In Progress", start="2024-05-01", expected="2026-12-31"),

        # State-district leakage (15% gap)
        dict(name="School Renovation Varanasi", scheme="MGNREGA", state="Uttar Pradesh", district="Varanasi", vendor="PQR",
             central=600000, state_recv=580000, dist_recv=490000, budget=470000, spent=350000,
             status="In Progress", start="2024-04-01", expected="2025-04-01"),

        # Normal project Kanpur
        dict(name="Community Hall Kanpur", scheme="PMAY", state="Uttar Pradesh", district="Kanpur", vendor="LMN",
             central=400000, state_recv=390000, dist_recv=380000, budget=370000, spent=280000,
             status="In Progress", start="2024-07-01", expected="2025-07-01"),

        # Completed successfully
        dict(name="Park Development Chennai", scheme="SBM", state="Tamil Nadu", district="Chennai", vendor="DEF",
             central=300000, state_recv=290000, dist_recv=285000, budget=280000, spent=275000,
             status="Completed", start="2023-03-01", expected="2024-03-01", actual="2024-02-28",
             rating=4.2, verified=True),

        # Fund diversion (district gets funds but project budget much lower)
        dict(name="Toilet Construction Coimbatore", scheme="SBM", state="Tamil Nadu", district="Coimbatore", vendor="GHI",
             central=900000, state_recv=850000, dist_recv=800000, budget=500000, spent=350000,
             status="In Progress", start="2024-01-01", expected="2025-01-01"),

        # Completed project in Jaipur
        dict(name="Solar Panel Installation Jaipur", scheme="MGNREGA", state="Rajasthan", district="Jaipur", vendor="XYZ",
             central=700000, state_recv=680000, dist_recv=660000, budget=640000, spent=620000,
             status="Completed", start="2023-06-01", expected="2024-06-01", actual="2024-07-15",
             rating=3.8, verified=True),

        # Delayed + underutilized in Jodhpur
        dict(name="Canal Restoration Jodhpur", scheme="PMGSY", state="Rajasthan", district="Jodhpur", vendor="PQR",
             central=1100000, state_recv=1000000, dist_recv=900000, budget=850000, spent=150000,
             status="Delayed", start="2022-06-01", expected="2023-12-31"),

        # Multiple vendor same district pattern (ABC in Pune too)
        dict(name="Hospital Extension Pune", scheme="PMAY", state="Maharashtra", district="Pune", vendor="ABC",
             central=1800000, state_recv=1700000, dist_recv=1650000, budget=1600000, spent=900000,
             status="In Progress", start="2024-08-01", expected="2026-08-01"),

        # High central-state leakage + low utilization
        dict(name="Irrigation Project Lucknow", scheme="MGNREGA", state="Uttar Pradesh", district="Lucknow", vendor="XYZ",
             central=2500000, state_recv=1800000, dist_recv=1700000, budget=1600000, spent=400000,
             status="In Progress", start="2023-09-01", expected="2025-03-31"),

        # Normal project Bangalore
        dict(name="Bus Stop Modernization Bangalore", scheme="PMGSY", state="Karnataka", district="Bangalore", vendor="LMN",
             central=200000, state_recv=195000, dist_recv=190000, budget=185000, spent=140000,
             status="In Progress", start="2024-10-01", expected="2025-10-01"),

        # Completed with disputes
        dict(name="Village Road Mysuru", scheme="PMGSY", state="Karnataka", district="Mysuru", vendor="GHI",
             central=350000, state_recv=340000, dist_recv=330000, budget=320000, spent=310000,
             status="Completed", start="2023-04-01", expected="2024-02-01", actual="2024-04-01",
             complaints=4, rating=2.0, verified=False),

        # Normal healthy project Chennai
        dict(name="Street Light Installation Chennai", scheme="SBM", state="Tamil Nadu", district="Chennai", vendor="ABC",
             central=150000, state_recv=148000, dist_recv=145000, budget=142000, spent=110000,
             status="In Progress", start="2024-11-01", expected="2025-06-30"),

        # Large project with moderate issues
        dict(name="Highway Extension Jaipur", scheme="PMGSY", state="Rajasthan", district="Jaipur", vendor="DEF",
             central=4000000, state_recv=3600000, dist_recv=3300000, budget=3100000, spent=1500000,
             status="In Progress", start="2024-01-01", expected="2026-06-30"),
    ]

    project_objs = []
    for p in projects_data:
        budget = p["budget"]
        spent = p["spent"]
        proj = Project(
            project_name=p["name"],
            scheme_id=schemes[p["scheme"]].id,
            state_id=states[p["state"]].id,
            district_id=districts[p["district"]].id,
            vendor_id=vendors[p["vendor"]].id,
            central_allocated_funds=p["central"],
            state_received_funds=p["state_recv"],
            district_received_funds=p["dist_recv"],
            project_budget=budget,
            spent_amount=spent,
            fund_utilization_rate=round(spent / budget, 4) if budget > 0 else 0,
            project_start_date=p.get("start"),
            expected_completion=p.get("expected"),
            actual_completion=p.get("actual"),
            project_status=p["status"],
            completion_verified=p.get("verified", False),
            citizen_rating=p.get("rating", 0),
            citizen_complaints=p.get("complaints", 0),
            created_at=now,
        )
        db.add(proj)
        db.flush()
        project_objs.append(proj)

    # ── Citizen Reports ───────────────────────────────────────────────
    reports_data = [
        # Reports against the false-completion Bangalore project (index 3)
        dict(project_idx=3, name="Ravi Kumar", text="Sanitation work not completed in our area. Open drains still present.", dispute=True),
        dict(project_idx=3, name="Priya Singh", text="Only 50% of toilets were built. Project shown as completed.", dispute=True),
        dict(project_idx=3, name="Anand Rao", text="No improvement in sanitation. Contractor did minimal work.", dispute=True),
        dict(project_idx=3, name="Meena Devi", text="Work was abandoned months ago. Now suddenly marked complete.", dispute=True),

        # Reports against Mysuru village road (index 17)
        dict(project_idx=17, name="Suresh Gowda", text="Road is already cracking. Poor quality materials used.", dispute=True),
        dict(project_idx=17, name="Lakshmi Bai", text="Road width is less than promised. Not usable for trucks.", dispute=True),
        dict(project_idx=17, name="Basappa", text="Only half the road was paved. Rest is still dirt.", dispute=True),

        # Normal reports
        dict(project_idx=0, name="Amit Sharma", text="Bridge construction is progressing well. Quality looks good.", dispute=False),
        dict(project_idx=10, name="Karthik Raman", text="Park is beautiful! Great work by the contractor.", dispute=False),
    ]

    for r in reports_data:
        report = CitizenReport(
            project_id=project_objs[r["project_idx"]].id,
            citizen_name=r["name"],
            report_text=r["text"],
            is_dispute=r["dispute"],
            created_at=now,
        )
        db.add(report)

    db.commit()

    print(f"[OK] Database seeded successfully!")
    print(f"   States: {len(states)}")
    print(f"   Districts: {len(districts)}")
    print(f"   Schemes: {len(schemes)}")
    print(f"   Vendors: {len(vendors)}")
    print(f"   Projects: {len(project_objs)}")
    print(f"   Citizen Reports: {len(reports_data)}")
    print(f"\n[TIP] Run POST /anomalies/scan to detect anomalies in the seeded data.")

    db.close()


if __name__ == "__main__":
    seed()
