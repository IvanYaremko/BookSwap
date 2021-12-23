import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Book } from "../../app/models/Book";

interface Props {
    books: Book[]
    selectBook: (id: string) => void
    deleteBook: (id: string) => void
    submitting: boolean
}

export default function BookList({ books, selectBook, deleteBook, submitting }: Props) {
    const [target, setTarget] = useState('')

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
                            <Button onClick={() => selectBook(book.id)} floated='right' color='blue' content='view' />
                            <Button
                                name={book.id}
                                loading={submitting && target === book.id}
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
}