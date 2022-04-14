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
        if (swapMap.size <= 1) loadSwaps()
        if(swapHistory.size <= 1) loadSwapHistory()
    }, [swapHistory, swapHistory.size, loadSwapHistory, swapMap,swapMap.size, loadSwaps])


    if (loadingInitial) return <LoadingComponent content="Loading history" />
    return (
        <>
            <Grid centered columns={1}>
                <Grid.Column>
                    <PastSwapsList />
                </Grid.Column>
            </Grid>
        </>
    )
})