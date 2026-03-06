# from fastapi import Depends, HTTPException
# from fastapi.security import HTTPBearer
# from app.core.firebase import verify_token

# security = HTTPBearer()

# def get_current_user(token=Depends(security)):
#     decoded = verify_token(token.credentials)

#     if not decoded:
#         raise HTTPException(status_code=401, detail="Invalid token")

#     return decoded

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from app.core.firebase import verify_token

security = HTTPBearer()

def get_current_user(token=Depends(security)):

    decoded = verify_token(token.credentials)

    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid token")

    return decoded