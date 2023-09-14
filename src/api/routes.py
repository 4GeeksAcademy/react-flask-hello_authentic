from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .models import db, User  # Importas User desde models.py
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback_default_secret_key')

jwt = JWTManager(app)
db.init_app(app)

# Las rutas y funciones de manejo asociadas
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    is_admin = data.get('is_admin', False)

    new_user = User(email=email, password=password, is_active=True, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        access_token = create_access_token(identity={'email': user.email, 'is_admin': user.is_admin})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/admin_route', methods=['GET'])
@jwt_required()
def admin_route():
    current_user = get_jwt_identity()
    if current_user['is_admin']:
        return jsonify(message="Hello Admin"), 200
    else:
        return jsonify(error="Admins only"), 403

if __name__ == '__main__':
    app.run(debug=True)
