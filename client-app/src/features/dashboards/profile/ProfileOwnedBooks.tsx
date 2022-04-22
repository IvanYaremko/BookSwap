import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Image, Tab } from "semantic-ui-react";
import BookStore from "../../../app/stores/BookStore";
import ProfileStore from "../../../app/stores/ProfileStore";
import { useStore } from "../../../app/stores/Store";

export default observer(function ProfileBooksOwned() {
    const { bookStore, profileStore } = useStore()
    const { booksOwnedMap, deleteBook, loading } = bookStore
    const { isCurrentUser } = profileStore
    const [target, setTarget] = useState("")

    function handleBookDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name)
        deleteBook(id)
    }
    return (
        <Tab.Pane>
            <Grid.Column width={16}>
                <Card.Group itemsPerRow={4} >
                    {Array.from(booksOwnedMap.values()).map(book => (
                        <Card key={book.id} fluid >
                            <Image src={book.image} style={{ height: "275px" }} />
                            <Button.Group fluid widths={2}>
                                {isCurrentUser ? (
                                    <>
                                        <Button
                                            basic
                                            color="blue"
                                            content="Details"
                                            as={Link} to={`/edit/${book.id}`}
                                        />
                                        <Button
                                            basic
                                            color="red"
                                            icon="trash"
                                            loading={target == book.id && loading}
                                            onClick={event => handleBookDelete(event, book.id)}
                                        />
                                    </>

                                ) : (
                                    <Button
                                        basic
                                        color="blue"
                                        content="Details"
                                        as={Link} to={`/books/${book.id}`}
                                    />
                                )}

                            </Button.Group>
                        </Card>
                    ))}
                </Card.Group>
            </Grid.Column>
        </Tab.Pane>
    )
})