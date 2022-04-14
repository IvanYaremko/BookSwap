import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import Profile from "./Profile";

export default observer(function ProfileDashboard() {
    const { bookStore, userStore  } = useStore()
    const { loadBooks, bookMap} = bookStore

    useEffect(() => {
       loadBooks()
        
    }, [bookMap.size, loadBooks])


    return (
        <>
            <Grid centered columns={2}>
                <Grid.Column>
                    <Profile/>
                </Grid.Column>
                <Grid.Column>
                    {userStore.user?.id}
                </Grid.Column>
            </Grid>
        </>
    )
})