import LatestMatch from "./Rows/LatestMatch";
import React, { useEffect, useState } from "react";

function LatestMatchTable(props) {

    let [matchData, setMatchData] = useState([]);

    let [showMore, setShowMore] = useState(true);

    const URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {

        fetch(URL + props.url + props.number)
            .then(response => response.json())
            .then(data => { setMatchData(data) }).catch(rejected => {
                console.log(rejected);
            });
    }, [props.url, props.number, URL])


    const showMoreMatches = () => {
        fetch(URL + props.url + "/all")
            .then(response => response.json())
            .then(data => { setMatchData(data) }).catch(rejected => {
                console.log(rejected);
            });

        setShowMore(false);
    }

    const showLessMatches = () => {
        fetch(URL + props.url + "/" + props.number)
            .then(response => response.json())
            .then(data => { setMatchData(data) }).catch(rejected => {
                console.log(rejected);
            });

        setShowMore(true);
    }

    return (
        <table className='Dashboard-Grid-Match'>
            <thead>
                <tr>
                    <th>Player 1</th>
                    <th>Army Played</th>
                    <th>Points Scored</th>
                    <th>Player 2</th>
                    <th>Army Played</th>
                    <th>Points Scored</th>
                    <th>Winner</th>
                    <th>Mission Pack</th>
                    <th>Date</th>
                </tr >
            </thead >
            <tbody>
                {matchData.map((m) => {
                    return (
                        <LatestMatch key={m.match_id} player_1={m.player_1} army_1={m.army_1} detachment_1={m.detachment_1} vp_1={m.vp_1} player_2={m.player_2} army_2={m.army_2} detachment_2={m.detachment_2} vp_2={m.vp_2} winner={m.winner} mission_pack={m.mission_pack} date={m.date} ></LatestMatch>
                    );
                })
                }

                {showMore ? <tr><td><button onClick={showMoreMatches} className="more-button"> More</button></td></tr> : <tr><td><button onClick={showLessMatches} className="more-button"> Less</button></td></tr>}

            </tbody>

        </table >

    );
}

export default LatestMatchTable;