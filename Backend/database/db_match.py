from models.match import Match, UserMatch
from models.army import Army, Detachment
from models.user import User

from sqlalchemy import not_


class DBMatch:
    def get_all_matches(self):
        """returns a list of all matches"""
        return Match.query.all()

    def get_all_user_matches(self):
        """returns a list of all UserMatches"""
        return UserMatch.query.all()

    def create_match(self, db, date, mission_pack, user_matches, commit=True):
        """Creates a match and adds it to the database and returns the match"""
        match = Match(date=date, mission_pack=mission_pack)

        db.session.add(match)

        for user_match in user_matches:
            match.user_matches.append(user_match)

        if commit:
            db.session.commit()

        return match

    def create_user_match(
        self, db, player_name, army_name, detachment_name, vp, is_winner, commit=True
    ):
        """Creates a match and adds it to the database and returns the match"""
        match = UserMatch(vp=vp, is_winner=is_winner)

        db.session.add(match)

        user = User.query.filter_by(username=player_name).first()
        if not user:
            print(player_name)
        user.matches.append(match)

        army = Army.query.filter_by(name=army_name).first()
        if not army:
            print(army_name)
        army.matches.append(match)

        matching_detachment = None
        for detachment in army.detachments:
            if detachment.name == detachment_name:
                matching_detachment = detachment
        if not matching_detachment and detachment_name:
            print(army.name)
            print(detachment_name)
            print(army.detachments)
        if detachment_name:
            matching_detachment.matches.append(match)

        if commit:
            db.session.commit()

        return match

    def get_matches_by_user(self, player_id):
        return UserMatch.query.filter_by(player_id=player_id)

    def get_matches_by_army(self, army_id):
        return UserMatch.query.filter_by(army_id=army_id)

    def get_match_by_id(self, id):
        match = Match.query.filter_by(id=id).first()
        return match

    def get_opponent_user_match(self, user_match):
        match = UserMatch.query.filter_by(match_id=user_match.match_id).filter(
            not_(UserMatch.player_id.like(user_match.player_id))
        )
        return match.first()

    def get_match_count(self):
        return len(Match.query.all())

    def get_num_armies_played(self):
        matches = UserMatch.query.all()

        distinct = set()
        for match in matches:
            distinct.add(match.army.name)

        return len(distinct)

    def get_detachments_played(self):
        matches = UserMatch.query.all()

        distinct = set()
        for match in matches:
            if match.detachment:
                distinct.add(match.detachment.name)

        return len(distinct)

    def get_avg_vp(self):
        matches = UserMatch.query.all()

        avg_vp = 0
        count = 0
        for match in matches:
            count += 1
            avg_vp += match.vp

        return avg_vp / count
