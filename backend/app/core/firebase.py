# import firebase_admin
# from firebase_admin import credentials, auth
# import os

# # cred = credentials.Certificate("firebase_key.json")

# # firebase_admin.initialize_app(cred)

# # def verify_token(token: str):
# #     try:
# #         decoded_token = auth.verify_id_token(token)
# #         return decoded_token
# #     except Exception:
# #         return None
# def verify_token(token: str):
#     return {"user": "dev_mode"}

import firebase_admin
from firebase_admin import credentials, firestore, auth

cred = credentials.Certificate("firebase_key.json")

firebase_admin.initialize_app(cred)

db = firestore.client()


def verify_token(token: str):
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception:
        return None