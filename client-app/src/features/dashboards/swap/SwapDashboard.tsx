import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SwapList from "./SwapList";
import { useStore } from "../../../app/stores/Store";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import UserRequestList from "./UserRequestList";

/**
 * 
 */
export default observer(function SwapDashboard() {
    const { swapStore, bookStore, userStore } = useStore()
    const { loadSwaps, loadRequested, loadMyRequests, loading, loadingInitial, myRequestsMap, requestedMap } = swapStore
    const { loadBooks} = bookStore

    useEffect(() => {
        loadBooks()
        loadSwaps()
        loadRequested(userStore.user!.id)
        loadMyRequests(userStore.user!.id)
        console.log("my requests ", requestedMap)
    }, [loadBooks, loadSwaps, loadRequested, loadMyRequests, userStore.user])




    if (loadingInitial || loading) return <LoadingComponent content='Loading Swaps' />
    return (
        <>
            
            <Grid centered columns={2}>
                <Grid.Column >
                    <h1>My requests</h1>
                    <Grid.Row width={1}/>
                    <SwapList />

                </Grid.Column>

                <Grid.Column>
                    <h1>Swap requests</h1>
                    <UserRequestList />
                </Grid.Column>
            </Grid>

        </>
    )
})