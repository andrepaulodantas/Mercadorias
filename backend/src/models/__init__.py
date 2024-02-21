# Em models/__init__.py

from src import db  # Importando a instância do SQLAlchemy

def create_tables(app):
    with app.app_context():
        db.create_all()

# Certifique-se de chamar create_tables(app) no local apropriado
# no seu aplicativo, depois de inicializar e configurar o app e db
