from models.army import Army, Detachment
from models.match import UserMatch


class DBArmy:
    def get_all_armies(self):
        """returns a list of all armies"""
        return Army.query.all()

    def get_all_detachments(self):
        """returns a list of all armies"""
        return Detachment.query.all()

    def get_army_by_name(self, name):
        """Queries armies by name"""
        return Army.query.filter_by(name=name).first()

    def get_detachment_for_army_by_name(self, army, name):
        """Queries detachments by name"""
        for detachment in army.detachments:
            if detachment.name == name:
                return detachment

        return None

    def create_detachment(self, db, name, commit=True):
        """Creates a new detachment in the database"""
        detachment = Detachment(name=name)

        db.session.add(detachment)

        if commit:
            db.session.commit()

        return detachment

    def create_faction(self, db, name, detachments, commit=True):
        """Creates a new faction in the database"""
        army = Army(name=name)

        db.session.add(army)

        for detachment in detachments:
            army.detachments.append(detachment)

        if commit:
            db.session.commit()

        return army
