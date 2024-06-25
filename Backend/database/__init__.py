"""
Package: database
This package contains all the database models and the database object itself.

import into other files using:

from .. import database -> (relative import)

usage:

database.users.get_users()
"""

from .db_user import DBUser
from .db_army import DBArmy
from .db_match import DBMatch


users = DBUser()
armies = DBArmy()
matches = DBMatch()
