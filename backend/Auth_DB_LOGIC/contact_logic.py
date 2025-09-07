# Auth_DB_LOGIC/contact_logic.py

from flask import Blueprint, request, jsonify
import psycopg2
from config import Config

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input provided ⚠️"}), 400

    full_name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not full_name or not email or not message:
        return jsonify({"error": "All fields are required ⚠️"}), 400

    try:
        conn = psycopg2.connect(Config.DATABASE_URL)
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO contacts (full_name, email, message)
            VALUES (%s, %s, %s);
            """,
            (full_name, email, message)
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Message sent successfully ✅"}), 201

    except psycopg2.Error as e:
        print("DB Error:", e)
        return jsonify({"error": "Database error ⚠️"}), 500

    except Exception as e:
        print("Server Error:", e)
        return jsonify({"error": "Server error ⚠️"}), 500
