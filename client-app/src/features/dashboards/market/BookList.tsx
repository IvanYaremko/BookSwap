import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

/**
 * Component to render books for the marketplace
 */
export default observer(function BookList() {
    const { bookStore, userStore } = useStore()
    const { bookMap, county } = bookStore



    return (
        <>
            <Segment>
                <Item.Group divided>
                    {/* Convert Map to array and filter for county and filter for user owned books */}
                    {Array.from(bookMap.values()).filter(book => book.county.toLowerCase() === county?.toLowerCase() && book.appUserId !== userStore.user?.id).map(book => (
                        <Item key={book.id}>
                            <Item.Image
                                size='tiny'
                                src={book.image}
                                as={Link} to={`/books/${book.id}`} 
                            />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as={Link} to={`/books/${book.id}`} >{book.title}</Item.Header>
                                <Item.Content> {book.author} </Item.Content>
                            </Item.Content>
                       
                            <Item.Meta hidden>{book.isbn13}</Item.Meta>
                        </Item>
                    ))}

                </Item.Group>
            </Segment>
        </>
    )
})