import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, Response, request
import jwt
from src import db
from src.models.usuario_model import Usuario
from datetime import datetime, timedelta
secret_key = os.getenv('SECRET_KEY')

usuarios_blueprint = Blueprint('usuarios_blueprint', __name__)

@usuarios_blueprint.route('/signup', methods=["POST"])
def handle_signup():
    try:
        data = request.json
        if "email" in data and "password" in data:
            user = Usuario.query.filter_by(email=data["email"]).first()
            if user:
                return Response(
                    response=json.dumps({'status': "failed", "message": "User Record already exists, kindly sign in"}),
                    status=409,
                    mimetype='application/json'
                )
            else:
                hashed_password = generate_password_hash(data["password"])
                new_user = Usuario(
                    email=data['email'],
                    name=data.get('name', ''),
                    password=hashed_password
                )
                db.session.add(new_user)
                db.session.commit()

                token = jwt.encode({
                    'user_id': new_user.id, 
                    'exp': datetime.utcnow() + timedelta(hours=24)
                }, secret_key, algorithm='HS256')

                return Response(
                    response=json.dumps({'status': "success", "message": "User Record Created Successfully", "token": token}),
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
            response=json.dumps({'status': "failed", "message": "Error Occurred", "error": str(e)}),
            status=500,
            mimetype='application/json'
        )

@usuarios_blueprint.route('/signin', methods=["POST"])
def handle_login():
    try:
        data = request.json
        if "email" in data and "password" in data:
            user = Usuario.query.filter_by(email=data["email"]).first()
            if user and check_password_hash(user.password, data["password"]):
                token = jwt.encode({
                    'user_id': user.id, 
                    'exp': datetime.utcnow() + timedelta(hours=24)
                }, secret_key, algorithm='HS256')

                return Response(
                    response=json.dumps({'status': "success", "message": "User Logged in Successfully", "token": token}),
                    status=200,
                    mimetype='application/json'
                )
            else:
                return Response(
                    response=json.dumps({'status': "failed", "message": "Invalid Email or Password"}),
                    status=401,
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
            response=json.dumps({'status': "failed", "message": "Error Occurred", "error": str(e)}),
            status=500,
            mimetype='application/json'
        )
