import React, { useEffect, useState } from 'react';

import PlayerStatSummary from "./Rows/PlayerStatSummary";

function PlayerStatSummaryTable() {
    const [player_data, setPlayerData] = useState([])

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

    const URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {

        fetch(URL + "users/stats")
            .then(response => response.json())
            .then(data => { setPlayerData(data) }).catch(rejected => {
                console.log(rejected);
            });
    }, [])

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...player_data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setSortConfig({ key, direction });
        setPlayerData(sortedData);
    };

    const matches = player_data.map((p) => {
        return (p.matches);
    })

    const winrate = player_data.map((p) => {
        return (p.winrate);
    })

    const avg_vp = player_data.map((p) => {
        return (p.avg_vp);
    })

    const max_data = {
        matches: Math.max(...matches),
        winrate: Math.max(...winrate),
        avg_vp: Math.max(...avg_vp)
    }

    function get_relative_line_width(key, value) {
        return ((value / max_data[key]) * 100).toFixed(3);
    }


    return (
        <table className='Dashboard-Grid-Player'>
            <thead>
                <tr>
                    <th onClick={() => sortData('player')}>Player</th>
                    <th onClick={() => sortData('matches')} > Matches</th>
                    <th onClick={() => sortData('winrate')} > Winrate</th>
                    <th onClick={() => sortData('avg_vp')} > AVG VP</th>
                </tr >
            </thead >
            <tbody>
                {player_data.map((p) => {
                    return (
                        <PlayerStatSummary key={p.player} player={p.player} matches={p.matches} winrate={p.winrate} avg_vp={p.avg_vp} matches_line_width={get_relative_line_width("matches", p.matches)} wr_line_width={get_relative_line_width("winrate", p.winrate)} avg_vp_line_width={get_relative_line_width("avg_vp", p.avg_vp)}></PlayerStatSummary>
                    );
                })
                }
            </tbody>
        </table >

    );
}

export default PlayerStatSummaryTable;