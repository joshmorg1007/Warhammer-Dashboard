""" User Database Model"""

from typing import List

from sqlalchemy.orm import Mapped
from werkzeug.security import generate_password_hash

from extension import db
from models.match import UserMatch


class User(db.Model):
    """User Database Model"""

    __tablename__ = "users"

    # Attributes
    id = db.mapped_column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    urole = db.Column(db.String(80))

    # Relationships
    matches: Mapped[List["UserMatch"]] = db.relationship(back_populates="player")

    def __init__(self, username, password, urole="ANY"):
        self.username = username
        self.password_hash = generate_password_hash(password)
        self.urole = urole

    def serialize(self):
        """Returns a serialized dictionary object of the User"""
        return {"id": self.id, "username": self.username}

    def __repr__(self):
        return f"User: {self.username}"
