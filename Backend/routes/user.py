"""User Routes"""

from flask import jsonify
from flask_cors import cross_origin
import database


def format_user_object(user):
    return {"name": user.username}


def format_users_object(users):
    users_list = []
    for user in users:
        users_list.append(format_user_object(user))

    return users_list


def init_user_routes(app, db):
    """Initializes all the user routes"""

    @app.route("/users", methods=["GET"])
    def get_users():
        users = database.users.get_all()

        formated = format_users_object(users)
        formated.sort(key=lambda x: x["name"])
        return jsonify(formated)

    @app.route("/users/stats", methods=["GET"])
    def get_users_stats():
        users = database.users.get_all()
        stats = []
        for user in users:
            matches = database.matches.get_matches_by_user(user.id)

            total_matches = 0
            wins = 0
            avg_vp = 0

            for match in matches:
                total_matches += 1
                avg_vp += match.vp
                if match.is_winner:
                    wins += 1

            win_rate = 0
            if total_matches > 0:
                avg_vp /= total_matches
                win_rate = wins / total_matches

                stats.append(
                    {
                        "player": user.username,
                        "matches": total_matches,
                        "winrate": win_rate,
                        "avg_vp": avg_vp,
                    }
                )

        return jsonify(stats)

    @app.route("/users/<name>/opponents", methods=["GET"])
    def get_user_opponent_stats(name):
        user = database.users.get_user_by_name(name)
        stats = {}

        for match in user.matches:
            op_match = database.matches.get_opponent_user_match(match)

            if op_match.player.username not in stats:
                stats[op_match.player.username] = {
                    "player": op_match.player.username,
                    "matches": 0,
                    "wins": 0,
                    "total_vp": 0,
                }
            stats[op_match.player.username]["matches"] += 1
            if not op_match.is_winner:
                stats[op_match.player.username]["wins"] += 1
            stats[op_match.player.username]["total_vp"] += match.vp

        formated_stats = []
        for stat in stats.values():
            formated_stats.append(
                {
                    "player": stat["player"],
                    "matches": stat["matches"],
                    "winrate": stat["wins"] / stat["matches"],
                    "avg_vp": stat["total_vp"] / stat["matches"],
                }
            )

        return jsonify(formated_stats)

    @app.route("/users/<name>/armies", methods=["GET"])
    @cross_origin()
    def get_users_army_stats(name):

        user = database.users.get_user_by_name(name)
        faction_dict = {}
        stats = []
        for match in user.matches:
            if match.army.name not in faction_dict:
                faction_dict[match.army.name] = []
            faction_dict[match.army.name].append(match)

        for army, matches in faction_dict.items():
            total_matches = 0
            wins = 0
            avg_vp = 0

            for match in matches:
                total_matches += 1
                avg_vp += match.vp
                if match.is_winner:
                    wins += 1

            win_rate = 0

            if total_matches > 0:
                avg_vp /= total_matches
                win_rate = wins / total_matches

                stats.append(
                    {
                        "army": army,
                        "matches": total_matches,
                        "winrate": win_rate,
                        "avg_vp": avg_vp,
                    }
                )

        return jsonify(stats)

    @app.route("/users/<name>/winrate", methods=["GET"])
    @cross_origin()
    def get_user_winrate_data(name):

        sorted_matches = []
        user = database.users.get_user_by_name(name)
        for user_match in user.matches:
            date = user_match.match.date

            sorted_matches.append((date, user_match.is_winner))

        sorted_matches.sort(key=lambda x: x[0])

        total = 0
        wins = 0
        data = []
        for time, is_winner in sorted_matches:
            total += 1
            if is_winner:
                wins += 1
            data.append(
                {"x": f"{time.year}-{time.month}-{time.day}", "y": wins / total}
            )

        winrate_data = {"id": name, "color": "hsl(0, 100%, 50%)", "data": data}
        return jsonify([winrate_data])
