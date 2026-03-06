import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_anomalies(data):
    model = IsolationForest(contamination=0.05)

    data["anomaly"] = model.fit_predict(data[["allocated", "spent"]])

    return data