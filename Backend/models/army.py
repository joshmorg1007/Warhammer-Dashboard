"""Army Database Model"""

from typing import List

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import DeclarativeBase
from extension import db


class Base(DeclarativeBase):
    """dummy"""


class Army(db.Model):
    """Army Database Model"""

    __tablename__ = "armies"

    id = db.mapped_column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, unique=True, nullable=False)

    matches: Mapped[List["UserMatch"]] = db.relationship(back_populates="army")
    detachments: Mapped[List["Detachment"]] = db.relationship()

    def __init__(self, name):
        self.name = name


class Detachment(db.Model):
    """Detachment Database Model"""

    __tablename__ = "detachments"

    id = db.mapped_column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    army_id = db.mapped_column(db.ForeignKey("armies.id"))

    matches: Mapped[List["UserMatch"]] = db.relationship(back_populates="detachment")

    def __init__(self, name):
        self.name = name
