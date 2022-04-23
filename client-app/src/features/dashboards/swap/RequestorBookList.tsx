import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Grid, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Book } from "../../../app/models/Book";
import { SwapRequests } from "../../../app/models/SwapRequests";
import { useStore } from "../../../app/stores/Store";

export default observer(function RequestorBookList() {
    const history = useHistory()
    const { swapStore, bookStore } = useStore()
    const { loadRequest, updateSwap, deleteSwap, loadSwap, selectedSwap, loading } = swapStore
    const { deleteBook } = bookStore
    const { id } = useParams<{ id: string }>()
    const [request, setRequest] = useState<SwapRequests>()

    useEffect(() => {
        if (id) {
            let request = loadRequest(id)
            setRequest(request)
            loadSwap(id)
        }
    }, [id, loadRequest, loadSwap])

    function handleSwap(book: Book) {
        selectedSwap!.status = "confirmed"
        selectedSwap!.requesterBookID = book.id
        let myBookToDelete = request?.ownerBook

        deleteBook(myBookToDelete?.id!)
        deleteBook(book.id)
        updateSwap(selectedSwap!).then(() => history.push('/books'))
    }

    function handleDelete() {
        deleteSwap(id).then(() => history.push('/swaps'))
    }


    if (request === undefined) return <LoadingComponent content="Loading users books..." />

    return (
        <>
            {console.log(request)}
            <Grid centered>
                <Grid.Row>
                    <h1>{request!.requestor.userName} book's</h1>
                </Grid.Row>
                <Grid.Row>
                    <Segment>
                        <Item.Group divided>
                            {request!.requestor.books?.map(book => (
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
                                        <Button content="swap" style={{ marginTop: '75px' }} color='blue' onClick={() => handleSwap(book)} loading={loading} />
                                    </Grid.Column>
                                </Item>
                            ))}
                        </Item.Group>

                    </Segment>

                </Grid.Row>
                <Button content="Decline swap" color="red" onClick={handleDelete} />
            </Grid>
        </>
    )
})