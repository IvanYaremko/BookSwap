import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";
import BookList from "./BookList";


export default observer(function BookDashboard() {
    const { bookStore } = useStore()
    const {loadBooks, bookMap } = bookStore
    
    useEffect(() => {
       if(bookMap.size <= 1) loadBooks()
      }, [bookMap.size, loadBooks])
    
    
    if(bookStore.loadingInitial) return <LoadingComponent content='Loading Books' />
    
    return (
        <>
            <Grid>
                <Grid.Column width='10'>
                    <BookList/>
                </Grid.Column>
               
            </Grid>
        </>
    )
})