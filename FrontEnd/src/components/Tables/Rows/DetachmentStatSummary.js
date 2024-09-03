function DetachmentStatSummary(props) {
    return (
        <tr>
            <td> {props.detachment}
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

export default DetachmentStatSummary;