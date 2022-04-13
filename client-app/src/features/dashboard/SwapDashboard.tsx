import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SwapList from "./SwapList";
import { useStore } from "../../app/stores/Store";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import UserRequestList from "./UserRequestList";


export default observer(function SwapDashboard() {
    const { swapStore, bookStore } = useStore()
    const { loadSwaps, swapMap, requestorMap, loadRequestors } = swapStore
    const { loadBooks, bookMap, booksRequested, loadBooksRequestedFromMe } = bookStore

    useEffect(() => {
        if (swapMap.size <= 1) loadSwaps()
        if (requestorMap.size <= 1) loadRequestors()
        if (booksRequested.size <= 1) loadBooksRequestedFromMe()
    }, [swapMap.size, swapMap, loadSwaps, bookMap.size, bookMap, loadBooks, requestorMap.size, requestorMap, loadRequestors, booksRequested, booksRequested.size, loadBooksRequestedFromMe])




    if (swapStore.loadingInitial) return <LoadingComponent content='Loading Swaps' />
    return (
        <>
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1>My requests</h1>
                    <SwapList />
                </Grid.Column>

                <Grid.Column>
                    <h1>Swap requests from</h1>
                    <UserRequestList />
                </Grid.Column>
            </Grid>

        </>
    )
})