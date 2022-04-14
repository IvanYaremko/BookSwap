import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Grid, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Book } from "../../../app/models/Book";
import { useStore } from "../../../app/stores/Store";

export default observer(function RequestorBookList() {
    const history = useHistory()
    const { swapStore, bookStore } = useStore()
    const { selectedRequestor: user, loadingInitial, loadSwap, selectedSwap: swap, updateSwap, deleteSwap  } = swapStore
    const { deleteBook } = bookStore
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) loadSwap(id)
    }, [id, loadSwap])

    function handleSwap(book: Book) {
        swap!.status = "confirmed"
        swap!.requesterBookID = book.id
        let myBookToDelete = bookStore.bookMap.get(swap?.ownerBookID!)

        deleteBook(myBookToDelete?.id!)
        deleteBook(book.id)
        updateSwap(swap!).then(() => history.push('/books'))
    }

    function handleDelete() {
        deleteSwap(id).then(() => history.push('/books'))
    }
    

    if (loadingInitial || !user) return <LoadingComponent content="Loading users books..." />

    return (
        <>
            <Grid centered>
                <Grid.Row>
                    <h1>{user.userName}'s books</h1>
                </Grid.Row>
                <Grid.Row>
                    <Segment>
                        <Item.Group divided>
                            {user.books?.map(book => (
                                <Item key={book.id}>
                                    <Item.Image
                                        size='tiny'
                                        src={book.image}
                                        to={`/books/${book.id}`}
                                    />
                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header>{book.title}</Item.Header>
                                        <Item.Content> {book.author} </Item.Content>
                                    </Item.Content>
                                    <Grid.Column>
                                        <Button content="swap" style={{marginTop:'75px'}} color='blue' onClick={() => handleSwap(book)}/>
                                    </Grid.Column>
                                </Item>
                            ))}
                        </Item.Group>
                      
                    </Segment>
                    
                </Grid.Row>
                <Button content="Decline swap" color="red" onClick={handleDelete}/>
            </Grid>
        </>
    )
})