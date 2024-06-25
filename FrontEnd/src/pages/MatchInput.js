import { useState, useEffect } from "react";

function MatchInput() {

    const [players, setPlayers] = useState([]);
    const [armies, setArmies] = useState([]);
    const [player1Detachments, setPlayer1Detachments] = useState([]);
    const [player2Detachments, setPlayer2Detachments] = useState([]);

    const [currentPlayer1, setCurrentPlayer1] = useState("");
    const [currentPlayer2, setCurrentPlayer2] = useState("");
    const [curretArmy1, setCurrentArmy1] = useState("");
    const [curretArmy2, setCurrentArmy2] = useState("");
    const [currentDetachment1, setCurrentDetachment1] = useState("");
    const [currentDetachment2, setCurrentDetachment2] = useState("");
    const [player1VP, setPlayer1VP] = useState([0]);
    const [player2VP, setPlayer2VP] = useState([0]);
    const [missionPack, setMissionPack] = useState(["PN"]);
    const [date, setDate] = useState([""]);
    const [winner, setWinner] = useState([""]);
    const [password, setPassword] = useState([""]);


    useEffect(
        () => {
            fetch("http://127.0.0.1:5000/users")
                .then(response => response.json())
                .then(data => {
                    setPlayers(data)
                    setCurrentPlayer1(data[0].name);
                    setCurrentPlayer2(data[0].name);
                    setWinner(data[0].name);
                }).catch(rejected => {
                    console.log(rejected);
                });

        }, [])

    useEffect(
        () => {
            fetch("http://127.0.0.1:5000/armies")
                .then(response => response.json())
                .then(data => {
                    setArmies(data);
                    updatePlayer1Detachments(data[0].name);
                    updatePlayer2Detachments(data[0].name);
                }).catch(rejected => {
                    console.log(rejected);
                });

        }, [])


    function updatePlayer1Detachments(army_name) {
        setCurrentArmy1(army_name);
        fetch("http://127.0.0.1:5000/armies/" + army_name + "/detachments")
            .then(response => response.json())
            .then(data => {
                setPlayer1Detachments(data);
                setCurrentDetachment1(data[0].name);
            }).catch(rejected => {
                console.log(rejected);
            });
    }

    function updatePlayer2Detachments(army_name) {
        setCurrentArmy2(army_name);
        fetch("http://127.0.0.1:5000/armies/" + army_name + "/detachments")
            .then(response => response.json())
            .then(data => {
                setPlayer2Detachments(data);
                setCurrentDetachment2(data[0].name);
            }).catch(rejected => {
                console.log(rejected);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const postData = new FormData();
        postData.append('Player 1', currentPlayer1);
        postData.append('Player 2', currentPlayer2);
        postData.append('Army 1', curretArmy1);
        postData.append('Army 2', curretArmy2);
        postData.append('Detachment 1', currentDetachment1);
        postData.append('Detachment 2', currentDetachment2);
        postData.append('VP 1', player1VP);
        postData.append('VP 2', player2VP);
        postData.append('Mission Pack', missionPack);
        postData.append('Winner', winner);
        postData.append('Date', date);
        postData.append('Password', password);

        fetch('http://127.0.0.1:5000/matches', {
            method: 'POST',
            body: postData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Match Submitted")
            })
            .catch((error) => {
                alert("Error Submitting Match")
            });
    }

    return (
        <form className="MatchInput" action={"http://127.0.0.1:5000/matches"} method="POST" onSubmit={(event) => handleSubmit(event)}>
            <div className="PlayerOneInput">
                <label>
                    Player 1:
                    <select id="Player1" value={currentPlayer1} onChange={(e) => setCurrentPlayer1(e.target.value)}>
                        {players.map((p) => {
                            return (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            );
                        })
                        }
                    </select>
                </label>
                <label>
                    Army 1:
                    <select id="Army1" onChange={(e) => { updatePlayer1Detachments(e.target.value) }}>
                        {armies.map((p) => {
                            return (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            );
                        })
                        }
                    </select>
                </label>
                <label>
                    Detachment 1:
                    <select id="Detachement1" onChange={(e) => { setCurrentDetachment1(e.target.value) }}>
                        {player1Detachments.map((p) => {
                            return (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            );
                        })
                        }
                    </select>
                </label>
                <label>
                    Player 1 VP:
                    <input value={player1VP} onChange={event => setPlayer1VP(event.target.value.replace(/\D/, ''))} />
                </label>
            </div>
            <div className="PlayerTwoInput">
                <label>
                    Player 2:
                    <select id="Player2" value={currentPlayer2} onChange={(e) => setCurrentPlayer2(e.target.value)}>
                        {players.map((p) => {
                            return (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            );
                        })
                        }
                    </select>
                </label>
                <label>
                    Army 2:
                    <select id="Army2" onChange={(e) => { updatePlayer2Detachments(e.target.value) }}>
                        {armies.map((p) => {
                            return (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            );
                        })
                        }
                    </select>
                </label>
                <label>
                    Detachment 2:
                    <select id="Detachement2" onChange={(e) => { setCurrentDetachment2(e.target.value) }}>
                        {player2Detachments.map((p) => {
                            return (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            );
                        })
                        }
                    </select>
                </label>
                <label>
                    Player 2 VP:
                    <input value={player2VP} onChange={e => setPlayer2VP(e.target.value.replace(/\D/, ''))} />
                </label>
            </div>
            <div className="rest">
                <label>
                    Mission Pack
                    <input value={missionPack} onChange={e => setMissionPack(e.target.value)} />
                </label>
                <label>
                    Winner:
                    <select id="winner" value={winner} onChange={(e) => { setWinner(e.target.value) }}>
                        <option key="1" value={currentPlayer1}>{currentPlayer1}</option>
                        <option key="2" value={currentPlayer2}>{currentPlayer2}</option>
                    </select>
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </div>


        </form>
    );

}

export default MatchInput;