import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";
import BookDetails from "../details/BookDetails";
import BookForm from "../form/BookForm";
import BookList from "./BookList";


export default observer(function BookDashboard() {
    const { bookStore } = useStore()
    const {selectedBook, editMode} = bookStore
    
    return (
        <>
            <Grid>
                <Grid.Column width='8'>
                    <BookList/>
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedBook && !editMode &&
                        <BookDetails />}
                    {editMode && 
                        <BookForm/>}
                </Grid.Column>
            </Grid>
        </>
    )
})