from flask import Blueprint, request
from config import db
from services.user_service import save_user_to_firestore

users_bp = Blueprint("users", __name__)

@users_bp.route("/save-user", methods=["POST"])
def save_user():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400

    save_user_to_firestore(data, db)
    return {"message": "User saved successfully"}, 200