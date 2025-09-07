from flask import Blueprint, jsonify
import requests
from config import Config

currency_bp = Blueprint("currency", __name__)

CURRENCIES = ["EUR", "GBP", "PKR"]
BASE = "USD" 

@currency_bp.route("/currency", methods=["GET"])
def get_currency_rates():
    try:
        if not Config.CURRENCY_API_KEY:
            return jsonify({
                "base": BASE,
                "rates": {curr: "N/A" for curr in CURRENCIES},
                "error": "Currency API key not configured ❌"
            }), 500

        url = f"{Config.CURRENCY_API_URL}/latest.json?app_id={Config.CURRENCY_API_KEY}"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        if "rates" not in data:
            return jsonify({
                "base": BASE,
                "rates": {curr: "N/A" for curr in CURRENCIES},
                "error": "No currency data found ⚠️"
            }), 502

        rates = {curr: data["rates"].get(curr, "N/A") for curr in CURRENCIES}

        return jsonify({
            "base": BASE, 
            "rates": rates
        }), 200

    except requests.RequestException as e:
        return jsonify({
            "base": BASE,
            "rates": {curr: "N/A" for curr in CURRENCIES},
            "error": "Failed to fetch currency rates ⚠️",
            "details": str(e)
        }), 500

    except Exception as e:
        return jsonify({
            "base": BASE,
            "rates": {curr: "N/A" for curr in CURRENCIES},
            "error": f"Unexpected server error ⚠️: {str(e)}"
        }), 500

