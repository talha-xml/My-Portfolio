import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_URL = os.getenv("DB_URL")

    SECRET_KEY = os.getenv("SECRET_KEY", "fallbacksecret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallbackjwtkey")

    API_KEY = os.getenv("ALPHA_VANTAGE_KEY")
    STOCK_API_URL = os.getenv("STOCK_API_URL")

    CURRENCY_API_URL = os.getenv("CURRENCY_API_URL")
    CURRENCY_API_KEY = os.getenv("CURRENCY_API_KEY")
