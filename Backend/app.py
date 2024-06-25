"""Main Flask App entry point"""

from flask import Flask
from flask_seeder import FlaskSeeder
from flask_cors import CORS
from routes.routes import init_routes


from extension import db, migrate

import database


def create_app():
    """Creates the Flask App"""
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "PLACEHOLDER"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

    migrate.init_app(app, db)
    db.init_app(app)
    cors = CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"

    seeder = FlaskSeeder()
    seeder.init_app(app, db)

    init_routes(app, db)

    return app


if __name__ == "__main__":
    create_app().run()
