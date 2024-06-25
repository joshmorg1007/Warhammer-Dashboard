"""Seeder module for DB"""

import json
import datetime
from flask_seeder import Seeder

import database


class SeedDB(Seeder):
    """Seeder class for DB"""

    def run(self):
        self.db.drop_all()
        self.db.create_all()

        ###############################################################
        # Seeding Users
        ###############################################################

        users = [
            "Paraston",
            "Flawedesign",
            "Colin",
            "GRams",
            "Alowishus",
            "gimmenut",
            "Quinn",
            "Daniel",
            "Funcle",
        ]

        for user in users:
            database.users.create_user(self.db, user, user, "ANY", False)
        self.db.session.commit()

        ###############################################################
        # Seeding Factions and detachments
        ###############################################################
        factions = [
            "Aeldari",
            "Drukhari",
            "Daemons",
            "Chaos Knights",
            "Chaos Space Marines",
            "Death Guard",
            "Thousand Sons",
            "World Eaters",
            "Sisters",
            "Black Templars",
            "Blood Angels",
            "Dark Angels",
            "Deathwatch",
            "Imperial Fists",
            "Iron Hands",
            "Raven Guard",
            "Salamanders",
            "Space Wolves",
            "Ultramarines",
            "White Scars",
            "Custodes",
            "AdMech",
            "Astra Militarum",
            "Grey Knights",
            "Knights",
            "Space Marines",
            "Genestealer Cults",
            "Leagues of Votann",
            "Necrons",
            "Tau",
            "Tyranids",
            "Orks",
        ]
        detachments = [
            ["Battle Host"],
            ["Realspace Raiders", "Skysplinter Assualt"],
            ["Daemonic Incursion"],
            ["Traitoris Lance"],
            ["Slaves to Darkness"],
            ["Plague Company"],
            ["Cult of Magic"],
            ["Berzerker Warband"],
            ["Hallowed Martyrs"],
            [
                "Righteous Crusader",
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Sons of Sanguinius",
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Unforgiven Task Force",
                "Inner Circle Task Force",
                "Company of Hunters",
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Black Spear Task Force",
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Champions of Russ",
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            [
                "Talons of The Emperor",
                "Shield Host",
                "Null Maiden Vigil",
                "Auric Champions",
            ],
            [
                "Rad-Zone Corps",
                "Skitarii Hunter Cohort",
                "Data-Psalm Conclave",
                "Explorator Maniple",
                "Cohort Cybernetica",
            ],
            ["Combined Regiment"],
            ["Teleport Strike Force"],
            ["Noble Lance"],
            [
                "Gladius Task Force",
                "Anvil Siege Force",
                "Ironstorm Spearhead",
                "Firestorm Assault Force",
                "Stormlance Task Force",
                "Vanguard Spearhead",
                "1st Company Task Force",
            ],
            ["Ascension Day"],
            ["Oathband"],
            [
                "Awakened Dynasty",
                "Annihilation Legion",
                "Canoptek Court",
                "Obeisance Phalanx",
                "Hypercrypt Legion",
            ],
            ["Mont'ka", "Retaliation Cadre", "Kroot Hunting Pack", "Kauyon"],
            [
                "Invasion Fleet",
                "Crusher Stampede",
                "Unending Swarm",
                "Assimilation Swarm",
                "Vanguard Onslaught",
                "Synaptic Nexus",
            ],
            [
                "War Horde",
                "Da Big Hunt",
                "Kult of Speed",
                "Dread Mob",
                "Green Tide",
                "Bully Boyz",
            ],
        ]

        for i, faction in enumerate(factions):
            army_detachments = []
            for detachment in detachments[i]:
                army_detachments.append(
                    database.armies.create_detachment(self.db, detachment, commit=False)
                )
            database.armies.create_faction(
                self.db, faction, army_detachments, commit=False
            )
        self.db.session.commit()

        ###############################################################
        # Seeding Matches ans UserMatches
        ###############################################################
        with open("initializations/match_data.json") as file:
            data = json.load(file)

        for match in data:
            date = match["Date"].split("/")

            usermatches = []
            usermatches.append(
                database.matches.create_user_match(
                    self.db,
                    match["Player 1"],
                    match["Army Played 1"],
                    match["Detachment 1"],
                    match["Points Scored 1"],
                    match["Who won"] == match["Player 1"],
                    commit=False,
                )
            )
            usermatches.append(
                database.matches.create_user_match(
                    self.db,
                    match["Player 2"],
                    match["Army Played 2"],
                    match["Detachment 2"],
                    match["Points Scored 2"],
                    match["Who won"] == match["Player 2"],
                    commit=False,
                )
            )

            database.matches.create_match(
                self.db,
                datetime.date(int(date[2]), int(date[0]), int(date[1])),
                match["mission_pack"],
                usermatches,
                commit=False,
            )
        self.db.session.commit()
