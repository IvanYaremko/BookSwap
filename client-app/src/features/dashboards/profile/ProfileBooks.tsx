import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";

export default observer(function ProfileBooks() {
    const [target, setTarget] = useState('')
    const { bookStore } = useStore()
    const { deleteBook, ownedBooks, loading} = bookStore

   

    function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteBook(id)
    }
    
    if(bookStore.loadingInitial) return <LoadingComponent content='Loading Books' />

    return (
        <>
          
                        <Card.Header><h3>Your books</h3></Card.Header>
                        <Segment>
                            <Item.Group divided>
                                {ownedBooks.map(book => (
                                    <Item key={book.id}>
                                        <Item.Image
                                            size='tiny'
                                            src={book.image}
                                        />
                                        <Item.Content verticalAlign='middle'>
                                            <Item.Header as={Link} to={`/books/${book.id}`}>{book.title}</Item.Header>
                                            <Item.Content> {book.author} </Item.Content>
                                        </Item.Content>
                                        <Item.Group>
                                            <Grid.Row>
                                            <Button
                                                name={book.id}
                                                loading={loading && target === book.id}
                                                onClick={(e) => handleBookDelete(e, book.id)}
                                                floated='right'
                                                color='red'
                                                content='delete'
                                                size="small" />
                                            <Button
                                                as={Link}
                                                to={`/edit/${book.id}`}
                                                basic color='blue'
                                                content='Edit' />
                                            </Grid.Row>
                                           
                                        </Item.Group>
                                        <Item.Meta hidden>{book.isbn13}</Item.Meta>
                                    </Item>
                                ))}

                            </Item.Group>
                        </Segment>
                 
        </>
    )
})