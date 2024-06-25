import { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import React from 'react'

function formatDate(dateStr) {
    let strArray = dateStr.split(" ");

    return strArray[0] + " " + strArray[1] + " " + strArray[2] + " " + strArray[3];
}

function WinRateLineChart(props) {

    const [winrateData, setWinrateData] = useState([{
        "id": "japan",
        "color": "hsl(0, 100%, 50%)",
        "data": [{ "x": "2000-12-12", "y": 0.4 }]
    }])

    useEffect(() => {

        fetch("http://127.0.0.1:5000/users/" + props.user + "/winrate")
            .then(response => response.json())
            .then(data => { setWinrateData(data) }).catch(rejected => {
                console.log(rejected);
            });

    }, [props.user])

    const theme = {
        labels: { text: { fontSize: 11 } },
        axis: {
            ticks: { text: { fontSize: 14, fill: "white" } }
        }
    };


    return (
        <div className="UserWinRateChart">
            <ResponsiveLine
                data={winrateData}
                colors={d => d.color}
                theme={theme}
                tooltip={dataPoint => {
                    console.log(dataPoint);
                    return (
                        <div>
                            <div style={{ backgroundColor: 'rgb(79, 78, 76)', borderRadius: "10px", padding: "3px" }}>
                                <strong>  Date:</strong>{" "}
                                {formatDate(dataPoint.point.data.xFormatted)}
                                <br></br>
                                <strong>   Winrate:</strong>{" "}
                                {dataPoint.point.data.yFormatted}
                            </div>
                        </div>
                    );
                }}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'time', format: "%Y-%m-%d", precision: "day" }}
                yScale={{
                    type: 'linear',
                    min: '0',
                    max: '1',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: "%b %d",
                    tickValues: "every 2 seconds",
                    legend: "time scale",
                    legendOffset: -20,
                    orient: "bottom",
                    tickValues: 15,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: "Date",
                    legendOffset: 40,
                    legendPosition: "left"

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Winrate',
                    legendOffset: -50,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                }}
                pointSize={3}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={- 12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={
                    [
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 80,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 20,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 20,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
            />
        </div >

    );
}
export default WinRateLineChart;
