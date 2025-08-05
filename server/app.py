from flask import Flask
from flask_cors import CORS
from routes.orders import orders_bp
from routes.docs import docs_bp
from routes.users import users_bp
app = Flask(__name__)
CORS(app)

# Blueprints
app.register_blueprint(orders_bp, url_prefix="/api")
app.register_blueprint(docs_bp, url_prefix="/generate")
app.register_blueprint(users_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)