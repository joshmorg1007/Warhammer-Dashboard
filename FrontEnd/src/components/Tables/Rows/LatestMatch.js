import { Link } from "react-router-dom";

function formatDate(dateStr) {
    let strArray = dateStr.split(" ");

    return strArray[0] + " " + strArray[1] + " " + strArray[2] + " " + strArray[3];
}

function LatestMatch(props) {

    let winner_style = "#9c3333";

    if (props.player_2 === props.winner) {
        winner_style = "#2A1CA1";
    }

    return (
        <tr>
            <td>
                <Link style={{ color: '#9c3333' }} to={{ pathname: `/users/${props.player_1}` }}> {props.player_1}</Link>
            </td>
            <td> {props.army_1}
                <div className="subtext minor">{props.detachment_1}</div>
            </td>
            <td> {props.vp_1}
            </td>
            <td>
                <Link style={{ color: '#2A1CA1' }} to={{ pathname: `/users/${props.player_2}` }}> {props.player_2}</Link>
            </td>
            <td> {props.army_2}
                <div className="subtext minor">{props.detachment_2}</div>
            </td>
            <td> {props.vp_2}
            </td>
            <td >
                <Link style={{ color: winner_style }} to={{ pathname: `/users/${props.winner}` }}> {props.winner}</Link>
            </td>
            <td>
                {props.mission_pack}
            </td>
            <td>
                <div className="date">
                    {formatDate(props.date.toString())}
                </div>
            </td >
        </tr >
    );
}

export default LatestMatch;