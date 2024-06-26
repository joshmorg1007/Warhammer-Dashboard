"""Match Database Model"""

from typing import List

from sqlalchemy.orm import Mapped
from extension import db


class Match(db.Model):
    """Match Database Model"""

    __tablename__ = "matches"

    # Attributes
    id = db.mapped_column(db.Integer, primary_key=True, autoincrement=True)
    date = db.mapped_column(db.DateTime, nullable=False)
    mission_pack = db.mapped_column(db.Text, default="L")

    def __init__(self, date, mission_pack="L"):
        self.date = date
        self.mission_pack = mission_pack

    # Relationships
    user_matches: Mapped[List["UserMatch"]] = db.relationship(back_populates="match")


class UserMatch(db.Model):
    """User Match Database Model"""

    __tablename__ = "user_matches"

    id = db.mapped_column(db.Integer, primary_key=True, autoincrement=True)
    match_id = db.mapped_column(db.ForeignKey("matches.id"))
    match = db.relationship("Match", back_populates="user_matches")
    player_id = db.mapped_column(db.ForeignKey("users.id"))
    player = db.relationship("User", back_populates="matches")
    army_id = db.mapped_column(db.ForeignKey("armies.id"))
    army = db.relationship("Army", back_populates="matches")
    detachment_id = db.mapped_column(db.ForeignKey("detachments.id"))
    detachment = db.relationship("Detachment", back_populates="matches")
    vp = db.mapped_column(db.Integer, nullable=False)

    is_winner = db.mapped_column(db.Boolean, nullable=False)

    def __init__(self, vp, is_winner):
        self.vp = vp
        self.is_winner = is_winner
