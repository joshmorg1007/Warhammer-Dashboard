"""Class containing User Database operations"""

from models.user import User


class DBUser:
    """Class containing User Database operations"""

    def get_all(self):
        """returns a list of all users"""
        return User.query.all()

    def get_user_by_name(self, name):
        """queries users by name"""
        return User.query.filter_by(username=name).first()

    def create_user(self, db, username, password, urole="ANY", commit=True):
        """Creates a user and adds it to the database and returns the user"""
        user = User(
            username=username,
            password=password,
            urole=urole,
        )

        db.session.add(user)

        if commit:
            db.session.commit()

        return user
