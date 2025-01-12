"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Events, Favorite
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    if "username" not in data or "email" not in data or "password" not in data:
        return jsonify({"error": "Faltan datos obligatorios."}), 400
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"error": "El usuario ya existe."}), 400
    new_user = User(username=data['username'], email=data['email'], password=data['password'], is_active=True)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usuario creado correctamente", "username": new_user.username, "email": new_user.email}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "error de servidor.", "detalles": str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if "username" not in data or "password" not in data:
        return jsonify({"error": "Faltan datos obligatorios."})
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({"error": "El usuario no existe."}), 404
    if data['password'] != user.password:
        return jsonify({"error": "Contraseña incorrecta."}), 401
    token = create_access_token(identity=user.username)
    return jsonify({"message": "Login correcto.", "token": token, "username": user.username, "first_name": user.first_name, "last_name": user.last_name})
    
@api.route('events', methods=['POST'])
@jwt_required()
def create_event():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    new_event = Events(title=data['title'], description=data['description'], date=data['date'], time=data['time'], location=data['location'], user_id=user.id)
    try:
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Evento añadido satisfactoriamente."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor."}), 500

@api.route('events', methods=['GET'])
def get_events():
    events = Events.query.all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify({"events": events})