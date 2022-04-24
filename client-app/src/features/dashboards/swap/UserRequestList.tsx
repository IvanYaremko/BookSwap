import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Grid, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
/**
 * 
 */
export default observer(function UserRequestList() {
    const { swapStore } = useStore()
    const { requestedMap } = swapStore


    return (
        <>
            {requestedMap.size === 0 ? (
                <h2>No swaps</h2>
            ) : (
                <Segment >
                    <Item.Group divided>
                        {Array.from(requestedMap.values()).map(request => (
                            <Item key={request.swapId}>
                                <Item.Content style={{marginLeft: "25px"}}>
                                    {request.requestor.photos.length === 0 ? (
                                        <Icon name="user" size="big" />
                                    ) : (
                                        <Image src={request.requestor.photos.find(image => image.isMain)?.url} size="tiny" />
                                    )}
                                    <Grid.Column width={1} />
                                    <Item.Header>{request.requestor!.userName}</Item.Header>
                                    <Grid.Column width={1} />
                                    <Item.Content> {request.requestor!.county} </Item.Content>
                                </Item.Content>

                                <Item.Content>
                                    <Link to={`/requestor/${request.swapId}`}>
                                        <Icon name="arrows alternate horizontal" size="huge" style={{ marginTop: "35px", marginLeft: "25px" }} />
                                    </Link>
                                </Item.Content>

                                <Item.Content>
                                    <Item.Image src={request.ownerBook.image} size="tiny" />
                                </Item.Content>
                            </Item>
                        ))}

                    </Item.Group>
                </Segment>
            )}
        </>
    )
})