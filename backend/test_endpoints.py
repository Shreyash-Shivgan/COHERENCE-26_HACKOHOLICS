"""Quick test script to verify all API endpoints are functioning."""
import urllib.request
import json
import sys

BASE = "http://localhost:8000"

ENDPOINTS = [
    ("GET", "/health"),
    ("GET", "/projects/dashboard-stats"),
    ("GET", "/projects"),
    ("GET", "/projects/1"),
    ("GET", "/projects/1/risk"),
    ("GET", "/budget/state-summary"),
    ("GET", "/budget/district-summary"),
    ("GET", "/budget/scheme-flow"),
    ("GET", "/anomalies"),
    ("GET", "/anomalies/high-risk"),
    ("GET", "/anomalies/state-hotspots"),
    ("GET", "/vendors"),
    ("GET", "/vendors/high-risk"),
    ("GET", "/vendors/1"),
    ("GET", "/citizen/reports"),
]

passed = 0
failed = 0

for method, path in ENDPOINTS:
    try:
        url = f"{BASE}{path}"
        req = urllib.request.Request(url, method=method)
        resp = urllib.request.urlopen(req, timeout=5)
        data = json.loads(resp.read())
        
        # Summary of what was returned
        if isinstance(data, list):
            summary = f"list of {len(data)} items"
        elif isinstance(data, dict):
            keys = list(data.keys())[:5]
            summary = f"dict with keys: {keys}"
        else:
            summary = str(data)[:80]
        
        print(f"[PASS] {method} {path} -> {summary}")
        passed += 1
    except Exception as e:
        print(f"[FAIL] {method} {path} -> {e}")
        failed += 1

# Test POST /anomalies/scan
try:
    req = urllib.request.Request(f"{BASE}/anomalies/scan", method="POST",
                                 data=b"", headers={"Content-Length": "0"})
    resp = urllib.request.urlopen(req, timeout=10)
    data = json.loads(resp.read())
    print(f"[PASS] POST /anomalies/scan -> {data.get('anomalies_detected', '?')} anomalies detected")
    passed += 1
except Exception as e:
    print(f"[FAIL] POST /anomalies/scan -> {e}")
    failed += 1

print(f"\n{'='*60}")
print(f"Results: {passed} passed, {failed} failed out of {passed+failed} tests")
if failed == 0:
    print("All tests passed!")
    sys.exit(0)
else:
    sys.exit(1)
