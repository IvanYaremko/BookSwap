import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";


export default observer(function BookDetails() {
    const { bookStore } = useStore()
    const { selectedBook: book, loadBook, loadingInitial } = bookStore
    const { id } = useParams<{ id: string }>()
    
    useEffect(() => {
        if (id) loadBook(id)
    }, [id, loadBook])

    if(loadingInitial || !book) return <LoadingComponent/>
    return (
            <Card fluid>
                <Image src={book.image} size="small" centered/>
                <Card.Content>
                    <Card.Header>{book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{ book.binding }</span>
                    </Card.Meta>
                    <Card.Description>
                        <h4>{book.author}</h4>
                    </Card.Description>
                    <Card.Description>
                        {book.synopsys}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        {/* <Button as={Link} to={`/edit/${book.id}`}  basic color='blue' content='Edit' /> */}
                        <Button size="tiny" as={Link} to={`/books`} color='green' content='Request swap' />
                   </Button.Group>
                </Card.Content>
            </Card>
        
    )
})