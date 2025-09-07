import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

class Config:
    # Database
    DATABASE_URL = os.getenv("DB_URL")

    # Flask / JWT
    SECRET_KEY = os.getenv("SECRET_KEY", "fallbacksecret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallbackjwtkey")

    # AlphaVantage API
    API_KEY = os.getenv("ALPHA_VANTAGE_KEY")
    STOCK_API_URL = os.getenv("STOCK_API_URL")

    # Open Exchange Rates API
    CURRENCY_API_URL = os.getenv("CURRENCY_API_URL")
    CURRENCY_API_KEY = os.getenv("CURRENCY_API_KEY")

