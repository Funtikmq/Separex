from flask import Blueprint, request, jsonify
from config import db
from datetime import datetime, timezone
import random

from utils.auth_utils import require_auth
from services.bom_service import billOfMaterials
orders_bp = Blueprint("orders", __name__)

@orders_bp.route("/calculate-order", methods=["POST"])
@require_auth
def calculate_order():
    data = request.get_json()
    bom = billOfMaterials(data)
    total_price, components = bom.calculate_price()
    return jsonify({"total": total_price, "bom": components})


@orders_bp.route("/save-order", methods=["POST"])
@require_auth
def save_order():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400

    products = data.get("products", [])
    if not products:
        return {"error": "No products provided"}, 400

    total_price = 0
    total_bom = []

    for prod in products:
        bom_obj = billOfMaterials(prod)
        price, components = bom_obj.calculate_price()
        total_price += price
        total_bom.extend(components)

    order_id = f"ORD-{random.randint(100000, 999999)}"
    order_doc = {
        "orderNumber": order_id,
        "createdAt": datetime.now(timezone.utc),
        "userEmail": data.get("userEmail"),
        "products": products,
        "total": total_price,
    }

    db.collection("orders").add(order_doc)
    return jsonify({"message": "Order saved", "orderNumber": order_id}), 200