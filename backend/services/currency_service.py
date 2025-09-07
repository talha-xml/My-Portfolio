from flask import Blueprint, jsonify
import requests
from config import Config

currency_bp = Blueprint("currency", __name__)

# Currencies to display in the dashboard
CURRENCIES = ["EUR", "GBP", "PKR"]
BASE = "USD"  # Base currency for API (must be USD on free Open Exchange Rates)

@currency_bp.route("/currency", methods=["GET"])
def get_currency_rates():
    try:
        if not Config.CURRENCY_API_KEY:
            return jsonify({
                "base": BASE,
                "rates": {curr: "N/A" for curr in CURRENCIES},
                "error": "Currency API key not configured ❌"
            }), 500

        # Open Exchange Rates API endpoint (base fixed to USD)
        url = f"{Config.CURRENCY_API_URL}/latest.json?app_id={Config.CURRENCY_API_KEY}"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        # Check if 'rates' exists in the response
        if "rates" not in data:
            return jsonify({
                "base": BASE,
                "rates": {curr: "N/A" for curr in CURRENCIES},
                "error": "No currency data found ⚠️"
            }), 502

        # Build rates object for only required currencies
        rates = {curr: data["rates"].get(curr, "N/A") for curr in CURRENCIES}

        return jsonify({
            "base": BASE,  # API base (USD)
            "rates": rates  # USD → EUR, GBP, PKR
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

