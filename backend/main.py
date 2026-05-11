import hashlib
import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import Base, SessionLocal, engine
from models import User

app = FastAPI()
logger = logging.getLogger("uvicorn.error")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.on_event("startup")
def test_database_connection():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        logger.info("Database connection test successful.")
    except Exception as error:
        logger.error(f"Database connection test failed: {error}")
        raise


@app.get("/")
def home():
    return {"message": "PostgreSQL Connected"}


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


@app.post("/auth/register")
def register_user(payload: RegisterRequest):
    db: Session = SessionLocal()
    try:
        existing_user = db.query(User).filter(
            (User.email == payload.email.lower().strip())
            | (User.username == payload.username.strip())
        ).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists.")

        user = User(
            username=payload.username.strip(),
            email=payload.email.lower().strip(),
            password_hash=hash_password(payload.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "User registered successfully.", "username": user.username}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User already exists.")
    finally:
        db.close()


@app.post("/auth/login")
def login_user(payload: LoginRequest):
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
        if not user or user.password_hash != hash_password(payload.password):
            raise HTTPException(status_code=401, detail="Invalid email or password.")
        return {"message": "Login successful.", "username": user.username}
    finally:
        db.close()