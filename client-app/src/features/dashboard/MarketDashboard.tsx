import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  Dropdown, Grid, Search } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";
import CustomSearch from "../Search/CustomSearch";
import BookList from "./BookList";

export default observer(function MarketDashboard() {
    const { bookStore, userStore } = useStore()
    const { loadBooks, bookMap, county, setCounty } = bookStore
    const {user} = userStore

    
    useEffect(() => {
        if (bookMap.size <= 1) loadBooks()
        if(county == undefined) setCounty(user?.county!)
    }, [bookMap.size, loadBooks])




    if (bookStore.loadingInitial) return <LoadingComponent content='Loading Books' />

    return (
        <>
            <Grid centered>
                <Grid.Column width='10' >
                    <Grid.Row>
                        <CustomSearch/>
                       
                    </Grid.Row>
                    <Search/>
                    <BookList />
                </Grid.Column>
            </Grid>
        </>
    )
})