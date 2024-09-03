import DetachmentStatSummary from "./Rows/DetachmentStatSummary";

import { useState, useEffect } from "react";

function DetachmentStatSummaryTable(props) {
    const [detachmentData, setDetachmentData] = useState([])

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

    const URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {

        fetch(URL + props.url + "/detachments/stats")
            .then(response => response.json())
            .then(data => { setDetachmentData(data) }).catch(rejected => {
                console.log(rejected);
            });
    }, [props.url, URL])

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...detachmentData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setSortConfig({ key, direction });
        setDetachmentData(sortedData);
    };

    const matches = detachmentData.map((p) => {
        return (p.matches);
    })

    const winrate = detachmentData.map((p) => {
        return (p.winrate);
    })

    const avg_vp = detachmentData.map((p) => {
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
        <table className='Dashboard-Grid-Detachment' >
            <thead>
                <tr>
                    <th onClick={() => sortData('detachment')}> detachment</th>
                    <th onClick={() => sortData('matches')} > Matches</th>
                    <th onClick={() => sortData('winrate')} > Winrate</th>
                    <th onClick={() => sortData('avg_vp')} > AVG VP</th>
                </tr >
            </thead >
            <tbody>
                {detachmentData.map((p) => {
                    return (
                        <DetachmentStatSummary key={p.detachment} detachment={p.detachment} matches={p.matches} winrate={p.winrate} avg_vp={p.avg_vp} matches_line_width={get_relative_line_width("matches", p.matches)} wr_line_width={get_relative_line_width("winrate", p.winrate)} avg_vp_line_width={get_relative_line_width("avg_vp", p.avg_vp)}></DetachmentStatSummary>
                    );
                })
                }
            </tbody>
        </table >



    );
}

export default DetachmentStatSummaryTable;