"""User Routes"""

from flask import jsonify
import database


def format_armies_obj(armies):
    army_list = []
    for army in armies:
        army_list.append({"name": army.name})

    return army_list


def init_army_routes(app, db):
    """Initializes all the user routes"""

    @app.route("/armies", methods=["GET"])
    def get_armies():
        armies = database.armies.get_all_armies()
        formated = format_armies_obj(armies)
        formated.sort(key=lambda x: x["name"])
        return jsonify(formated)

    @app.route("/armies/<name>/detachments", methods=["GET"])
    def get_army_detachments(name):
        army = database.armies.get_army_by_name(name)

        print(army.name)

        return jsonify(format_armies_obj(army.detachments))

    @app.route("/armies/stats", methods=["GET"])
    def get_armies_stats():
        armies = database.armies.get_all_armies()
        stats = []
        for army in armies:
            matches = database.matches.get_matches_by_army(army.id)

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
                        "army": army.name,
                        "matches": total_matches,
                        "winrate": win_rate,
                        "avg_vp": avg_vp,
                    }
                )

        return jsonify(stats)
