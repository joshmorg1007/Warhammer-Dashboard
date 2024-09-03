import DetachmentStatSummaryTable from "../components/Tables/DetachmentStatSummaryTable";
import PlayerStatSummaryTable from "../components/Tables/PlayerStatSummaryTable";
import LatestMatchTable from "../components/Tables/LatestMatchTable";

import { useParams } from "react-router-dom";

function ArmyDashboard() {
    let { name } = useParams();

    return (
        <div className="Army-Dashboard-Grid">
            <DetachmentStatSummaryTable url={"armies/" + name}> test </DetachmentStatSummaryTable>
            <PlayerStatSummaryTable url={"users/armies/" + name + "/stats"}></PlayerStatSummaryTable>
            <LatestMatchTable url={"matches/armies/" + name + "/"} number={"5"}></LatestMatchTable>
        </div>
    );
}

export default ArmyDashboard;