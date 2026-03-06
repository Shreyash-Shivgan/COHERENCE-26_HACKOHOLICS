"""Start the server, run all endpoint tests, then stop the server."""
import subprocess
import sys
import time
import urllib.request
import json

# Start server in background
print("Starting server...")
server = subprocess.Popen(
    [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
)

# Wait for server to be ready
time.sleep(3)
BASE = "http://127.0.0.1:8000"

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

try:
    for method, path in ENDPOINTS:
        try:
            url = f"{BASE}{path}"
            req = urllib.request.Request(url, method=method)
            resp = urllib.request.urlopen(req, timeout=5)
            data = json.loads(resp.read())
            if isinstance(data, list):
                summary = f"list[{len(data)}]"
            elif isinstance(data, dict):
                keys = list(data.keys())[:5]
                summary = f"dict{keys}"
            else:
                summary = str(data)[:80]
            print(f"  [PASS] {method} {path} -> {summary}")
            passed += 1
        except Exception as e:
            print(f"  [FAIL] {method} {path} -> {e}")
            failed += 1

    # POST /anomalies/scan
    try:
        req = urllib.request.Request(f"{BASE}/anomalies/scan", method="POST",
                                     data=b"", headers={"Content-Length": "0"})
        resp = urllib.request.urlopen(req, timeout=10)
        data = json.loads(resp.read())
        count = data.get("anomalies_detected", "?")
        print(f"  [PASS] POST /anomalies/scan -> {count} anomalies detected")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] POST /anomalies/scan -> {e}")
        failed += 1

    # After scan, re-check anomalies
    try:
        req = urllib.request.Request(f"{BASE}/anomalies", method="GET")
        resp = urllib.request.urlopen(req, timeout=5)
        data = json.loads(resp.read())
        print(f"  [INFO] After scan: {len(data)} total anomalies in database")
    except:
        pass

finally:
    server.terminate()
    server.wait()

print(f"\n{'='*50}")
print(f"Results: {passed} passed, {failed} failed / {passed+failed}")
if failed == 0:
    print("All endpoint tests passed!")
