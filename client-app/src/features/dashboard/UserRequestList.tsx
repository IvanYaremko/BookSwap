import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Grid, Icon } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";

export default observer(function UserRequestList() {
    const { swapStore, bookStore } = useStore()
    const { booksRequestedFromMe, setRequestor } = swapStore
    const { booksRequested } = bookStore


    return (
        <>
            <Segment >
                <Item.Group divided relaxed>
                    {booksRequestedFromMe.map(user => (
                        <Grid columns={3}>
                            <Grid.Column>
                                <Item key={user.userId} style={{ marginLeft: "40%" }}>
                                    <Item.Content verticalAlign='middle' style={{ maringTop: "25px" }} >
                                        <Icon name="user" size="big" />
                                            <Item.Header>{user.userName}</Item.Header>
                                        <Item.Content> {user.county} </Item.Content>
                                    </Item.Content>

                                </Item>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to={`/requestor/${user.swapId}`} onClick={() => setRequestor(user.userId!)}>
                                    <Icon name="refresh" size="big" style={{ marginTop: "35px", marginLeft: "25px" }} />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Item.Image src={booksRequested.get(user!.swapId!)?.image} size="tiny" />
                            </Grid.Column>
                        </Grid>
                    ))}

                </Item.Group>
            </Segment>
        </>
    )
})