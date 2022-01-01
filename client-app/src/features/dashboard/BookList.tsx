import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";


export default observer(function BookList() {
    const [target, setTarget] = useState('')
    const { bookStore } = useStore()
    const {deleteBook, books, loading} = bookStore

    function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteBook(id)
    }

    return (
        <>
            <Segment>
                <Item.Group divided>

                    {books.map(book => (
                        <Item key={book.id}>
                            <Item.Image
                                size='tiny'
                                src='https://react.semantic-ui.com/images/wireframe/image.png' />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='a'>{book.title}</Item.Header>
                                <Item.Content> {book.author} </Item.Content>
                            </Item.Content>
                            <Button onClick={() => bookStore.selectBook(book.id)} floated='right' color='blue' content='view' />
                            <Button
                                name={book.id}
                                loading={loading && target === book.id}
                                onClick={(e) => handleBookDelete(e, book.id)}
                                floated='right'
                                color='red'
                                content='delete' />
                            <Item.Meta hidden>{book.isbn13}</Item.Meta>
                        </Item>
                    ))}

                </Item.Group>
            </Segment>
        </>
    )
})