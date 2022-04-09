import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { Book } from "../../app/models/Book";
import { useStore } from "../../app/stores/Store";


export default observer(function SwapList() {
    const { swapStore } = useStore()
    const { booksIRequest, getSwapFromBookId, deleteSwap } = swapStore
    

    function handleCancle(book: Book) {
        let swap = getSwapFromBookId(book.id)
        let swapId = swap.id
        console.log(swapId)
        deleteSwap(swapId)
    }
    
    return (
        <>
            <Segment compact>
                <Item.Group divided relaxed>
                    {console.log("from swapDashboard" + {booksIRequest})}
                    {booksIRequest.map(book => (
                        
                        <Item key={book.id}>
                            <Item.Image
                                size='tiny'
                                src={book.image}
                                as={Link} to={`/books/${book.id}`} 
                            />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header >{book.title}</Item.Header>
                                <Item.Content> {book.author} </Item.Content>
                            </Item.Content>
                            <Item.Meta hidden>{book.isbn13}</Item.Meta>
                            <Button
                                content="cancel"
                                size="tiny"
                                style={{ height: '50px', width: '70px', marginTop: '75px' }}
                                color='red'
                                onClick={() => handleCancle(book)}/>
                        </Item>

                        
                    ))}

                </Item.Group>
            </Segment>
        </>
    )
})