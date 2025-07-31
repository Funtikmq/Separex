import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def set_admin_role(email):
    try :
        user = auth.get_user_by_email(email)
        auth.set_custom_user_claims(user.uid,{"role" : "admin"})
        print(f"Successfully set admin role for {email}")
    except Exception as e:
        print(f"Error")