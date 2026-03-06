from pydantic import BaseModel
from typing import Optional


class UserLogin(BaseModel):
    email: str
    password: str


class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "citizen"
    department: str = ""


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    department: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
