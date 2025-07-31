import firebase_admin
from firebase_admin import credentials, firestore
import datetime


cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def save_user_to_firestore(user_data):
    uid = user_data.get("uid")
    email = user_data.get("email")
    display_name = user_data.get("displayName")
    role = user_data.get("role", "customer")
    timestamp = user_data.get("timestamp")


    user_doc = {
        "email": email,
        "displayName": display_name,
        "role": role,
        "lastLogin": timestamp,
    }

    db.collection("users").document(uid).set(user_doc, merge=True)
