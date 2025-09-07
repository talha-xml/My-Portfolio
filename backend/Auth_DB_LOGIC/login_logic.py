from flask import Blueprint, request, jsonify
import psycopg2
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from config import Config
from datetime import timedelta

login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json(force=True)
        identifier = (data.get("identifier") or "").strip()
        password = (data.get("password") or "").strip()

        if not identifier or not password:
            return jsonify({"error": "Email and password are required ⚠️"}), 400

        conn = psycopg2.connect(Config.DATABASE_URL)
        cur = conn.cursor()
        cur.execute(
            "SELECT full_name, username, email, password FROM signup WHERE email = %s OR username = %s;",
            (identifier, identifier)
        )
        user = cur.fetchone()
        cur.close()
        conn.close()

        if not user:
            return jsonify({"error": "User not found ❌"}), 404

        full_name, username, email, hashed_password = user

        if not check_password_hash(hashed_password, password):
            return jsonify({"error": "Incorrect password ❌"}), 401

        access_token = create_access_token(
            identity={"username": username, "email": email, "full_name": full_name},
            expires_delta=timedelta(hours=2)
        )

        return jsonify({
            "message": "Login successful ✅",
            "user": {"full_name": full_name, "username": username, "email": email},
            "token": access_token
        }), 200

    except psycopg2.Error as e:
        print("Database Error:", e)
        return jsonify({"error": "Database error ⚠️"}), 500
    except Exception as e:
        print("Server Error:", e)
        return jsonify({"error": "Server error ⚠️"}), 500
