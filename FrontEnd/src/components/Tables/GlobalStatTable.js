import GlobalStat from "./Rows/GlobalStat";
import React, { useEffect, useState } from "react";

function GlobalStatTable() {
    let [globalData, setGlobalData] = useState([])

    const URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {

        fetch(URL + "matches/stats")
            .then(response => response.json())
            .then(data => { setGlobalData(data) }).catch(rejected => {
                console.log(rejected);
            });
    }, [])


    return (
        <table className='Dashboard-Grid-Global'>
            <thead>
                <tr>
                    <th>Global Statistic</th>
                    <th>Value</th>
                </tr >
            </thead >
            <tbody>
                {globalData.map((m) => {
                    return (
                        <GlobalStat key={m.stat} stat={m.stat} value={m.value}> </GlobalStat>
                    );
                })
                }
            </tbody>
        </table >

    );
}

export default GlobalStatTable