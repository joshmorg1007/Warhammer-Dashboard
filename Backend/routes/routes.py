"""Modules for handling all the routes of the Flask App"""

from .user import init_user_routes
from .matches import init_match_routes
from .armies import init_army_routes


def init_routes(app, db):
    """Initializes all the routes of the app"""
    init_user_routes(app, db)
    init_match_routes(app, db)
    init_army_routes(app, db)
