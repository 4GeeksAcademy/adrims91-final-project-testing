"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
import os
from api.models import db, User, Events, Favorite
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta


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
    token = create_access_token(identity=user.username, expires_delta=timedelta(days=5))
    return jsonify({"message": "Login correcto.", "token": token})
    
@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    data = request.get_json()
    if not "title" in data or not "description" in data:
        return jsonify({"error": "Faltan datos obligatorios."}), 400
    try:
        date_str = data['date']
        time_str = data['time']
        date = datetime.strptime(date_str, '%Y-%m-%d')
        time = datetime.strptime(time_str, '%H:%M').time()
    except ValueError:
        return jsonify({"error": "Formato de fecha u hora incorrecto."}), 400

    current_user_username = get_jwt_identity()
    user = User.query.filter_by(username=current_user_username).first()
    
    new_event = Events(
        title=data['title'],
        description=data['description'],
        date=date,
        time=time,
        location=data['location'],
        price=data['price'],
        image=data['image'],
        user_id=user.id
    )
    
    try:
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Evento añadido satisfactoriamente."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error de servidor, {e}"}), 500



@api.route('/events', methods=['GET'])
def get_events():
    events = Events.query.all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify({"events": events}), 200

@api.route('/event/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Events.query.filter_by(id=event_id)
    event = list(map(lambda x: x.serialize(), event))
    return jsonify(event), 200
    

@api.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    user_username = get_jwt_identity()
    user = User.query.filter_by(username=user_username).first()
    event = Events.query.filter_by(id=event_id).first()
    
    if not event:
        return jsonify({"error": "No has seleccionado ningún evento para eliminar."}), 404
    if event.user_id != user.id:
        return jsonify({"error": "Solo puedes eliminar un evento que sea propio."}), 401
    try:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Evento eliminado correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
@api.route('/user')
@jwt_required()
def get_user_data():
    current_user_username = get_jwt_identity()
    user = User.query.filter_by(username=current_user_username).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.serialize())
@api.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user_data():
    data = request.get_json()
    current_user_username = get_jwt_identity()
    user = User.query.filter_by(username=current_user_username).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    if data.get("username"):
        user.username = data['username']
    if data.get("email"):
        user.email = data['email']
    if data.get("password"):
        user.password = data['password']
    if data.get("firstName"):
        user.first_name = data['firstName']
    if data.get("lastName"):
        user.last_name = data['lastName']
    if data.get("residence"):
        user.residence = data['residence']
    if data.get("phone"):
        user.phone = data['phone']
    if data.get("bio"):
        user.bio = data['bio']
    db.session.commit()
    return jsonify({"message": "Datos actualizados correctamente."})
    