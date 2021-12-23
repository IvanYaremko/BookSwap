import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Book } from "../../app/models/Book";

interface Props {
    books: Book[]
    selectBook: (id: string) => void
    deleteBook: (id: string) => void
}

export default function BookList({ books, selectBook, deleteBook }: Props) {
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
                            <Button onClick={() => deleteBook(book.id)} floated='right' color='red' content='delete' />
                            <Item.Meta hidden>{book.isbn13}</Item.Meta>
                        </Item>
                    ))}

                </Item.Group>
            </Segment>
        </>
    )
}