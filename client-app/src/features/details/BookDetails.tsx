import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BookSwap } from "../../app/models/BookSwap";
import { useStore } from "../../app/stores/Store";
import { v4 as uuid } from 'uuid'

/**
 * 
 */
export default observer(function BookDetails() {
    const history = useHistory()
    const { bookStore, userStore, swapStore } = useStore()
    const { selectedBook: book, loadBook, loadingInitial } = bookStore
    const { user } = userStore
    const { createSwap, swapMap} = swapStore
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) loadBook(id)
    }, [id, loadBook ])

    function handleSwapRequest() {
        let swap: BookSwap = {
            id: uuid(),
            ownerID: book!.appUserId,
            ownerBookID: book!.id,
            requesterID: user!.id,
            requesterBookID: "",
            status: "request"
        }
        console.log(swap)
        createSwap(swap).then(() => history.push("/books"))
    }

    if (loadingInitial || !book) return <LoadingComponent />
    return (
        <Card fluid>
            <Image src={book.image} size="small" centered />
            <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{book.binding}</span>
                </Card.Meta>
                <Card.Description>
                    <h4>{book.author}</h4>
                </Card.Description>
                <Card.Description>
                    {book.synopsys}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {console.log(swapMap.get("dcd0e50c-2c73-44dd-ba33-a3a406dbf5e1"))}
                {console.log(Array.from(swapMap.values()).filter(swap => swap.ownerBookID === book.id && swap.requesterID === user?.id).length)}
                {Array.from(swapMap.values()).filter(swap => swap.ownerBookID === book.id && swap.requesterID === user?.id).length >= 1
                    ?
                    <Button.Group widths='2'>
                        <Button size="tiny" as={Link} to={`/books`} color='red' content='Already requested'/>
                    </Button.Group>
                    :
                    <Button.Group widths='2'>
                        <Button size="tiny" as={Link} to={`/books`} color='green' content='Request swap' onClick={handleSwapRequest} />
                    </Button.Group>
                }
            </Card.Content>
        </Card>

    )
})