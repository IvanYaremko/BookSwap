import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SwapList from "./SwapList";
import { useStore } from "../../app/stores/Store";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default observer(function SwapDashboard() {
    const { swapStore, bookStore } = useStore()
    const { loadSwaps, swapMap } = swapStore
    const { loadBooks, bookMap } = bookStore

    useEffect(() => {
        if (bookMap.size <= 1) loadBooks()
        if (swapMap.size <= 1) loadSwaps()
    }, [swapMap.size, swapMap, loadSwaps, bookMap.size, bookMap, loadBooks])

    if (swapStore.loadingInitial) return <LoadingComponent content='Loading Swaps' />


    return (
        <>
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1>My requests</h1>
                    <SwapList />
                </Grid.Column>

                <Grid.Column>
                    <h1>Swap requests</h1>
                </Grid.Column>
            </Grid>

        </>
    )
})