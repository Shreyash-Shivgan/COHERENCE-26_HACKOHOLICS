import os
import sys
sys.path.insert(0, os.path.abspath("."))
try:
    from app.ml.prediction_model import predict
    res = predict([0]*21)
    print("SUCCESS", res)
except Exception as e:
    import traceback
    traceback.print_exc()
