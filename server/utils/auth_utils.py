from firebase_admin import auth
from flask import request, jsonify
from functools import wraps

def verify_firebase_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer"):
        raise ValueError("Missing or invalid auth token")

    id_token = auth_header[len("Bearer "):].strip()
    decoded_token = auth.verify_id_token(id_token)
    return decoded_token

def require_auth(f):
    @wraps(f)
    def decorated_function(*args,**kwargs):
        try :
            user = verify_firebase_token()
        except Exception as e:
            return jsonify({"error": str(e)}), 401
        request.user = user
        return f(*args,**kwargs)
    return decorated_function
