import PlayerStatSummaryTable from '../components/Tables/PlayerStatSummaryTable';
import LatestMatchTable from '../components/Tables/LatestMatchTable';
import GlobalStatTable from '../components/Tables/GlobalStatTable';

function MainDashboard() {
    return (
        <div className='Dashboard-Grid'>
            <PlayerStatSummaryTable></PlayerStatSummaryTable>
            <GlobalStatTable></GlobalStatTable>
            <LatestMatchTable url={"matches/"} number={"10"}></LatestMatchTable>
        </div >
    );
}

export default MainDashboard;