import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import PastSwapsList from "./PastSwapsList";
/**
 * 
 */
export default observer(function SwapHistoryDashboard() {
    const { swapStore, userStore } = useStore()
    const { loadHistory, loading, historyMap } = swapStore

    useEffect(() => {
        loadHistory(userStore.user!.id)
    }, [loadHistory, userStore.user])


    if (loading) return <LoadingComponent content="Loading history" />
    return (
        <>
            <Grid centered columns={1}>
                <Grid.Column width={16}>
                    {Array.from(historyMap.values()).length === 0 ? (
                        <h3>No swaps made </h3>) : (
                            <PastSwapsList/> )}
                </Grid.Column>
            </Grid>
        </>
    )
})