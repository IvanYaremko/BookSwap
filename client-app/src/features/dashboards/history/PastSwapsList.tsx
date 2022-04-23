import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {  Grid, Icon, Image, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function PastSwapsList() {
    const { swapStore, userStore } = useStore()
    const { historyMap } = swapStore

    return (
        <>
            <h1>Swap History</h1>
            <Segment compact>
                <Item.Group divided relaxed>
                    {Array.from(historyMap.values()).map(swap => (
                        <Item key={swap.swapId}>

                            <Grid.Column>
                                <Grid.Row>
                                </Grid.Row>
                                <Grid.Row>
                                    <Item.Image src={swap.ownerBook!.image} size="tiny" />
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to={`/history/${swap.swapId}`}>
                                    <Icon name="arrows alternate horizontal" style={{ marginLeft: "25px", marginTop: "40px" }} size="huge" />

                                </Link>
                            </Grid.Column>
                            <Grid.Column style={{ marginLeft: "25px" }}>
                                <Grid.Row>
                                </Grid.Row>
                                <Grid.Row>
                                    <Item.Image src={swap.requestorBook!.image} size="tiny" />
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column style={{ marginLeft: "25px" }}>
                                <Grid.Row>
                                    <Item.Content><b>Member</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row >
                                    <Item.Content>
                                        {swap.owner.userName === userStore.user?.userName ? (swap.requestor.userName) : (swap.owner.userName)}
                                    </Item.Content>
                                    {swap.owner.userName === userStore.user?.userName ? (
                                        <Image src={swap.requestor.photos.find(image => image.isMain)?.url} size="tiny" />
                                    ) : (
                                        <Image src={swap.owner.photos.find(image => image.isMain)?.url} size="tiny" />
                                    )}
                                    <Item.Content>{swap.requestor.county}</Item.Content>
                                </Grid.Row>
                            </Grid.Column>


                        </Item>

                    ))}
                </Item.Group>
            </Segment>
        </>
    )
})