from src import db

class Mercadoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer)
    description = db.Column(db.String(120))
    price = db.Column(db.Float)
    
    def __init__(self, name, quantity, description, price):
        self.name = name
        self.quantity = quantity
        self.description = description
        self.price = price
               
    def __repr__(self):
        return f'Mercadoria {self.nome}'
    
    def to_json(self):
        return {'id': self.id, 'name': self.name, 'quantity': self.quantity, 'description': self.description, 'price': self.price}
    
    def from_json(request):
        data = request.get_json()
        return Mercadoria(name=data['name'], quantity=data['quantity'], description=data['description'], price=data['price'])
    
    def update(self, request):
        data = request.get_json()
        self.name = data['name']
        self.quantity = data['quantity']
        self.description = data['description']
        self.price = data['price']
        return self
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        return self
    
    def get_all():
        return Mercadoria.query.all()
    
    def get_by_id(id):
        return Mercadoria.query.get_or_404(id)
    
    def create(request):
        return Mercadoria.from_json(request).save()
    
    
    
  
