from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(20), unique=False, nullable=False)
    last_name = db.Column(db.String(20), unique=False, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)
    profile_image = db.Column(db.String(150), unique=False, nullable=True)
    bio = db.Column(db.String(250), unique=False, nullable=True)
    residence = db.Column(db.String(50), unique=False, nullable=True)
    events = db.relationship('Events', backref='user')
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
            "bio": self.bio,
            "residence": self.residence,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), unique=False, nullable=False)
    description = db.Column(db.String(150), unique=False, nullable=False)
    date = db.Column(db.String(12), unique=False, nullable=False)
    time = db.Column(db.String(8), unique=False, nullable=False)
    location = db.Column(db.String(20), unique=False, nullable=False)
    image = db.Column(db.String(150), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f"<Events {self.title} - {self.date} {self.time}>"

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'time': self.time,
            'location': self.location,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            "user_id": self.user_id
        }

class Favorite(db.Model):
    id = id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    def __repr__(self):
        return f"<Favorite {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "events_id": self.events_id
        }