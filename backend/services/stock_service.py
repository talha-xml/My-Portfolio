from flask import Blueprint, jsonify, request
import requests
from config import Config

stock_bp = Blueprint("stock", __name__)

@stock_bp.route("/stock", methods=["GET"])
def get_stock():
    symbol = request.args.get("symbol", "AAPL")

    if not Config.API_KEY:
        return jsonify({"error": "API key not configured ❌"}), 500

    try:
        url = f"{Config.STOCK_API_URL}&symbol={symbol}&apikey={Config.API_KEY}"
        response = requests.get(url, timeout=8)
        response.raise_for_status()
        data = response.json()

        if "Global Quote" not in data or not data["Global Quote"]:
            return jsonify({"error": "No stock data found or API limit reached ⚠️"}), 502

        quote = data["Global Quote"]
        return jsonify({
            "symbol": quote.get("01. symbol", symbol),
            "price": quote.get("05. price", "--"),
            "change": quote.get("09. change", "--"),
            "changePercent": quote.get("10. change percent", "--"),
        }), 200

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Stock API request failed: {str(e)}"}), 502
    except Exception as e:
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500
