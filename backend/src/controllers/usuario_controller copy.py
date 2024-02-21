import json
import os
import bcrypt
from flask import Blueprint, Response, request, jsonify
import jwt
from src import db
from src.models.usuario_model import Usuario
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt

usuarios_blueprint = Blueprint('usuarios_blueprint', __name__)

@usuarios_blueprint.route('/signup', methods = ["POST"])
def handle_signup():
    try: 
        # first check user parameters
        data = request.json
        if "email" and "password" in data:
            # check db for user records
            user = Usuario.query.filter_by(email = data["email"]).first()

            # if user records exists we will check user password
            if user:
                return Response(
                    response=json.dumps({'status': "failed", "message": "User Record already exists, kindly sign in"}),
                    status=409,
                    mimetype='application/json'
                )
            else:
                # hash user password
                hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())
                new_user = Usuario(
                    email=data['email'],
                    name=data.get('name', ''),
                    password=hashed_password,
                    created_at=datetime.now()
                )
                db.session.add(new_user)
                db.session.commit()
                return Response(
                    response=json.dumps({'status': "success", "message": "User Record Created Successfully"}),
                    status=201,
                    mimetype='application/json'
                )
        else:
            return Response(
                response=json.dumps({'status': "failed", "message": "User Parameters Email and Password are required"}),
                status=400,
                mimetype='application/json'
            )
    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed", 
                                    "message": "Error Occured",
                                    "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
  
        
@usuarios_blueprint.route('/<int:id>', methods = ["GET"])
def get_usuario(id):
    try:
        user = Usuario.query.get_or_404(id)
        return jsonify(user.to_json())
    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed", 
                                    "message": "Error Occured",
                                    "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
        
@usuarios_blueprint.route('/<int:id>', methods = ["PUT"])
def update_usuario(id):
    try:
        user = Usuario.query.get_or_404(id)
        data = request.json
        user.name = data['name']
        user.email = data['email']
        user.password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        db.session.commit()
        return jsonify({'message': 'Usuario atualizado com sucesso!'})
    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed", 
                                    "message": "Error Occured",
                                    "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
        
@usuarios_blueprint.route('/<int:id>', methods = ["DELETE"])
def delete_usuario(id):
    try:
        user = Usuario.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'Usuario deletado com sucesso!'})
    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed", 
                                    "message": "Error Occured",
                                    "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
 
@usuarios_blueprint.route('/login', methods=['POST'])
def handle_login():
    try:
        data = request.json
        user = Usuario.query.filter_by(email=data['email']).first()
        if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
            token = jwt.encode({'id': user.id, 'email': user.email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, os.environ.get('SECRET_KEY'), algorithm='HS256')
            return jsonify({'token': token})
        else:
            return Response(
                response=json.dumps({'status': "failed", "message": "Invalid Email or Password"}),
                status=401,
                mimetype='application/json'
            )
    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed", 
                                    "message": "Error Occured",
                                    "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
        
@usuarios_blueprint.route('/usuarios', methods = ["GET"])
def get_usuarios():
    try:
        all_users = Usuario.query.all()
        return jsonify([user.to_json() for user in all_users])
    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed", 
                                    "message": "Error Occured",
                                    "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
        
        