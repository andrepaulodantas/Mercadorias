# src/routes.py

from src.controllers.mercadorias_controller import mercadorias_blueprint
from src.controllers.usuario_controller import usuarios_blueprint

def init_app(app):
    app.register_blueprint(mercadorias_blueprint, url_prefix='/mercadorias')    
    app.register_blueprint(usuarios_blueprint, url_prefix='/usuarios')
