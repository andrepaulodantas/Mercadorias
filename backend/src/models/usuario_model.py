from src import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        
    def __repr__(self):
        return f'Usuario {self.name}'
    
    def to_json(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}
    
    def from_json(request):
        data = request.get_json()
        return Usuario(name=data['name'], email=data['email'], password=data['password'])
    
    def update(self, request):
        data = request.get_json()
        self.name = data['name']
        self.email = data['email']
        self.password = data['password']
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
        return Usuario.query.all()
    
    def get_by_id(id):
        return Usuario.query.get_or_404(id)
    
    def create(request):
        return Usuario.from_json(request).save()