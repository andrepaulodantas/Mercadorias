from flask import Blueprint, Response, request, jsonify
from src import db
from src.models.mercadoria_model import Mercadoria

mercadorias_blueprint = Blueprint('mercadorias_blueprint', __name__)

@mercadorias_blueprint.route('/', methods=["POST"])
def handle_mercadorias():
    data = request.json
    new_mercadoria = Mercadoria(
        name=data['name'],
        quantity=data['quantity'],
        description=data.get('description', ''),
        price=data.get('price', 0.0)
    )
    db.session.add(new_mercadoria)
    db.session.commit()

    return jsonify({'message': 'Mercadoria adicionada com sucesso!'}), 201

@mercadorias_blueprint.route('/', methods=["GET"])
def get_mercadorias():
    all_mercadorias = Mercadoria.query.all()
    return jsonify([mercadoria.to_json() for mercadoria in all_mercadorias])

@mercadorias_blueprint.route('/<int:id>', methods=["GET"])
def get_mercadoria(id):
    mercadoria = Mercadoria.query.get_or_404(id)
    return jsonify(mercadoria.to_json())

@mercadorias_blueprint.route('/<int:id>', methods=["PUT"])
def update_mercadoria(id):
    mercadoria = Mercadoria.query.get_or_404(id)
    data = request.json
    mercadoria.name = data['name']
    mercadoria.quantity = data['quantity']
    mercadoria.description = data.get('description', '')
    mercadoria.price = data.get('price', 0.0)
    db.session.commit()

    return jsonify({'message': 'Mercadoria atualizada com sucesso!'}), 200

@mercadorias_blueprint.route('/<int:id>', methods=["DELETE"])
def delete_mercadoria(id):
    mercadoria = Mercadoria.query.get_or_404(id)
    db.session.delete(mercadoria)
    db.session.commit()

    return jsonify({'message': 'Mercadoria deletada com sucesso!'}), 200

