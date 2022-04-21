import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import PastSwapsList from "./PastSwapsList";

export default observer(function SwapHistoryDashboard() {
    const { swapStore } = useStore()
    const {loadSwapHistory, swapHistory, swapMap, loadSwaps, loadingInitial} = swapStore

    useEffect(() => {
        loadSwaps()
        loadSwapHistory()
    }, [swapHistory, swapHistory.size, loadSwapHistory, swapMap,swapMap.size, loadSwaps])


    if (loadingInitial) return <LoadingComponent content="Loading history" />
    return (
        <>
            <Grid centered columns={1}>
                <Grid.Column>
                    {Array.from(swapHistory.values()).length == 0 ? (<h3>No swaps made </h3>) : (<PastSwapsList />)}
                </Grid.Column>
            </Grid>
        </>
    )
})