from flask import jsonify, abort, request
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

import database


def format_match_obj(match):
    winner = ""
    if match.user_matches[0].is_winner:
        winner = match.user_matches[0].player.username
    else:
        winner = match.user_matches[1].player.username

    detachment_1 = "Unknown"
    if match.user_matches[0].detachment:
        detachment_1 = match.user_matches[0].detachment.name

    detachment_2 = "Unknown"
    if match.user_matches[1].detachment:
        detachment_2 = match.user_matches[1].detachment.name

    match_dict = {
        "match_id": match.id,
        "player_1": match.user_matches[0].player.username,
        "army_1": match.user_matches[0].army.name,
        "detachment_1": detachment_1,
        "vp_1": match.user_matches[0].vp,
        "player_2": match.user_matches[1].player.username,
        "army_2": match.user_matches[1].army.name,
        "detachment_2": detachment_2,
        "vp_2": match.user_matches[1].vp,
        "winner": winner,
        "mission_pack": match.mission_pack,
        "date": match.date,
    }
    return match_dict


def format_matches_obj(matches):
    json_matches = []
    for match in matches:
        json_matches.append(format_match_obj(match))
    return json_matches


def init_match_routes(app, db):
    """Initializes all the user routes"""

    @app.route("/matches/<number>", methods=["GET"])
    def get_matches(number):
        matches = sorted(
            format_matches_obj(database.matches.get_all_matches()),
            key=lambda x: x["date"],
            reverse=True,
        )
        if number == "all":
            return jsonify(matches)
        if number.isnumeric():
            return jsonify(matches[: int(number)])
        else:
            abort(400)

    @app.route("/matches", methods=["POST"])
    def post_matches():
        player_1 = request.form.get("Player 1", "")
        player_2 = request.form.get("Player 2", "")

        army_1 = request.form.get("Army 1", "")
        army_2 = request.form.get("Army 2", "")

        detachment_1 = request.form.get("Detachment 1", "")
        detachment_2 = request.form.get("Detachment 2", "")

        VP_1 = request.form.get("VP 1", 0)
        VP_2 = request.form.get("VP 2", 0)

        mission_pack = request.form.get("Mission Pack", "")

        winner = request.form.get("Winner", "")

        date = request.form.get("Date", None)

        password = request.form.get("Password", "")

        print(request.form)
        if not check_password_hash(
            generate_password_hash("temppass"), password
        ):  # move to environmental variable
            abort(401)
        if (
            player_1 == ""
            or player_2 == ""
            or army_1 == ""
            or army_2 == ""
            or detachment_1 == ""
            or detachment_2 == ""
            or winner == ""
            or date == ""
        ):
            abort(400)
        user_match_1 = database.matches.create_user_match(
            db, player_1, army_1, detachment_1, VP_1, player_1 == winner, commit=False
        )

        user_match_2 = database.matches.create_user_match(
            db, player_2, army_2, detachment_2, VP_2, player_2 == winner, commit=False
        )

        match = database.matches.create_match(
            db, date, mission_pack, [user_match_1, user_match_2], commit=False
        )

        return jsonify(format_match_obj(match))

    @app.route("/matches/<name>/<number>", methods=["GET"])
    def get_matches_from_user(name, number):
        user = database.users.get_user_by_name(name)
        m = [user_match.match for user_match in user.matches]
        matches = sorted(
            format_matches_obj(m),
            key=lambda x: x["date"],
            reverse=True,
        )
        if number == "all":
            return jsonify(matches)
        if number.isnumeric():
            return jsonify(matches[: int(number)])
        else:
            abort(400)

    @app.route("/matches/stats", methods=["GET"])
    def get_global_match_statistics():
        total_matches = database.matches.get_match_count()
        num_armies = database.matches.get_num_armies_played()
        num_detachment = database.matches.get_detachments_played()
        avg_vp = database.matches.get_avg_vp()

        return jsonify(
            [
                {
                    "stat": "Total Matches",
                    "value": total_matches,
                },
                {
                    "stat": "Armies Played",
                    "value": num_armies,
                },
                {
                    "stat": "Detachments Played",
                    "value": num_detachment,
                },
                {"stat": "Average VP", "value": "{:.2f}".format(avg_vp)},
            ]
        )
