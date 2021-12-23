import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Book } from "../../app/models/Book";

interface Props{
    book: Book
    cancelSelectBook: () => void
    openForm: (id: string) => void
}

export default function BookDetails({book, cancelSelectBook, openForm}: Props) {
    return (
        
            <Card>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Card.Content>
                    <Card.Header>{book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{ book.binding }</span>
                    </Card.Meta>
                    <Card.Description>
                        {book.author}
                    </Card.Description>
                    <Card.Description>
                        {book.synopsys}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button onClick={() => openForm(book.id)} basic color='blue' content='Edit' />
                        <Button onClick={cancelSelectBook} color='grey' content='Cancel' />
                   </Button.Group>
                </Card.Content>
            </Card>
        
    )
}