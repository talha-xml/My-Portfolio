# Auth_DB_LOGIC/signup_logic.py

from flask import Blueprint, request, jsonify
import psycopg2
import re
from psycopg2.errors import UniqueViolation
from werkzeug.security import generate_password_hash
from config import Config

signup_bp = Blueprint("signup", __name__)

# ===================== VALIDATION HELPERS =====================
def validate_full_name(full_name):
    # Allow letters, spaces, hyphens, 2-50 characters
    return re.match(r"^[A-Za-z\s\-]{2,50}$", full_name)

def validate_username(username):
    # Must start with letter, 3-30 characters, letters/numbers/underscore
    return re.match(r"^[A-Za-z][A-Za-z0-9_]{2,29}$", username)

def validate_password(password):
    # Min 8 chars, at least one uppercase, one lowercase, one number, one special char
    return (
        len(password) >= 8
        and re.search(r"[A-Z]", password)
        and re.search(r"[a-z]", password)
        and re.search(r"[0-9]", password)
        and re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
    )

# ===================== SIGNUP ROUTE =====================
@signup_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(force=True)

    full_name = (data.get("full_name") or "").strip()
    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip()
    password = (data.get("password") or "").strip()

    # ===================== VALIDATION =====================
    if not full_name or not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if not validate_full_name(full_name):
        return jsonify({"error": "Invalid full name"}), 400

    if not validate_username(username):
        return jsonify({"error": "Invalid username format"}), 400

    if not validate_password(password):
        return jsonify({"error": "Weak password"}), 400

    hashed_pw = generate_password_hash(password)

    # ===================== DATABASE INSERT =====================
    try:
        conn = psycopg2.connect(Config.DATABASE_URL)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO signup (full_name, username, email, password) VALUES (%s, %s, %s, %s)",
            (full_name, username, email, hashed_pw)
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Signup successful ✅"}), 201

    except UniqueViolation:
        conn.rollback()
        return jsonify({"error": "Email or username already exists ❌"}), 409

    except Exception as e:
        # Catch all other DB or server errors
        print("Signup Error:", e)
        return jsonify({"error": f"Server error: {str(e)}"}), 500

