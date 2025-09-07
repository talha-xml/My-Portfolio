from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from Auth_DB_LOGIC.db import db

# Blueprints
from Auth_DB_LOGIC.signup_logic import signup_bp
from Auth_DB_LOGIC.login_logic import login_bp
from Auth_DB_LOGIC.contact_logic import contact_bp
from services.stock_service import stock_bp
from services.currency_service import currency_bp


def create_app():
    app = Flask(__name__)

    # Configurations
    app.config["SQLALCHEMY_DATABASE_URI"] = Config.DATABASE_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

    # Extensions
    db.init_app(app)
    CORS(app)
    JWTManager(app)

    # Register blueprints
    app.register_blueprint(signup_bp, url_prefix="/api")
    app.register_blueprint(login_bp, url_prefix="/api")
    app.register_blueprint(contact_bp, url_prefix="/api")
    app.register_blueprint(stock_bp, url_prefix="/api")
    app.register_blueprint(currency_bp, url_prefix="/api")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

