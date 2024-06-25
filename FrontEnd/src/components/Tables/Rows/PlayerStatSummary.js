import { Link } from "react-router-dom";

function PlayerStatSummary(props) {
    return (
        <tr>
            <td> <Link to={{ pathname: `/users/${props.player}` }}> {props.player}</Link>
            </td>
            <td> {props.matches}
                <div className="bar bar-default">
                    <div className="segment segment-match" style={{ width: String(props.matches_line_width) + "%" }}></div>
                </div>
            </td>
            <td> {String((props.winrate * 100).toFixed(2)) + "%"}
                <div className="bar bar-default">
                    <div className="segment segment-match" style={{ width: String(props.wr_line_width) + "%" }}></div>
                </div>
            </td>
            <td> {props.avg_vp.toFixed(2)}
                <div className="bar bar-default">
                    <div className="segment segment-match" style={{ width: String(props.avg_vp_line_width) + "%" }}></div>
                </div>
            </td>
        </tr >
    );
}

export default PlayerStatSummary;