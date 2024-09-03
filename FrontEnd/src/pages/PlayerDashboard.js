import ArmyStatSummaryTable from '../components/Tables/ArmyStatSummaryTable';
import WinRateLineChart from '../components/Charts/WinRateLineChart';
import LatestMatchTable from '../components/Tables/LatestMatchTable';
import PlayerVersusSummaryTable from '../components/Tables/PlayerVersusSummaryTable';

import { useParams } from "react-router-dom";
function PlayerDashboard() {
    let { name } = useParams();


    return (
        <div className='Player-Dashboard-Grid'>
            <ArmyStatSummaryTable url={"users/" + name + "/armies"}></ArmyStatSummaryTable>
            <WinRateLineChart user={name}></WinRateLineChart>
            <PlayerVersusSummaryTable user={name}></PlayerVersusSummaryTable>
            <LatestMatchTable url={"matches/users/" + name + "/"} number={"5"}></LatestMatchTable>
        </div>

    );
}

export default PlayerDashboard;