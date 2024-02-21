from flask import Flask, Blueprint
import os
from src.config.config import Config
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
    
load_dotenv()


app = Flask(__name__)
CORS(app)

config = Config().dev_config

app.env = config.ENV

app.secret_key = os.environ.get("SECRET_KEY")
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', False)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
    
from src.models.mercadoria_model import Mercadoria
from src.controllers.mercadorias_controller import mercadorias_blueprint
from src.controllers.usuario_controller import usuarios_blueprint
app.register_blueprint(mercadorias_blueprint, url_prefix='/')
app.register_blueprint(usuarios_blueprint, url_prefix='/')





