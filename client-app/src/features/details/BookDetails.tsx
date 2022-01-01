import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";


export default observer(function BookDetails() {
    const { bookStore } = useStore()
    const {selectedBook: book, openForm, cancelSelectedBook} = bookStore

    if(!book) return <LoadingComponent/>
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
                        <Button onClick={cancelSelectedBook} color='grey' content='Cancel' />
                   </Button.Group>
                </Card.Content>
            </Card>
        
    )
})