import React, { useEffect, useState } from 'react';

import ArmyStatSummary from "./Rows/ArmyStatSummary";

function ArmyStatSummaryTable(props) {
    const [armyData, setArmyData] = useState([])

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

    const URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {

        fetch(URL + props.url)
            .then(response => response.json())
            .then(data => { setArmyData(data) }).catch(rejected => {
                console.log(rejected);
            });
    }, [props.url])

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...armyData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setSortConfig({ key, direction });
        setArmyData(sortedData);
    };

    const matches = armyData.map((p) => {
        return (p.matches);
    })

    const winrate = armyData.map((p) => {
        return (p.winrate);
    })

    const avg_vp = armyData.map((p) => {
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
        <div className='Table-Container'>
            <table className='Dashboard-Grid-Army' >
                <thead>
                    <tr>
                        <th onClick={() => sortData('army')}> Army</th>
                        <th onClick={() => sortData('matches')} > Matches</th>
                        <th onClick={() => sortData('winrate')} > Winrate</th>
                        <th onClick={() => sortData('avg_vp')} > AVG VP</th>
                    </tr >
                </thead >
                <tbody>
                    {armyData.map((p) => {
                        return (
                            <ArmyStatSummary key={p.army} army={p.army} matches={p.matches} winrate={p.winrate} avg_vp={p.avg_vp} matches_line_width={get_relative_line_width("matches", p.matches)} wr_line_width={get_relative_line_width("winrate", p.winrate)} avg_vp_line_width={get_relative_line_width("avg_vp", p.avg_vp)}></ArmyStatSummary>
                        );
                    })
                    }
                </tbody>
            </table >
        </div>


    );
}

export default ArmyStatSummaryTable;