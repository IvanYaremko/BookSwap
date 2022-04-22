import { observer } from "mobx-react-lite";
import { Grid, Icon, Image, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function PastSwapsList() {
    const { swapStore } = useStore()
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
                                <Item.Content ><b>You swapped</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row>
                                    <Item.Image src={swap.ownerBook!.image} size="tiny" />
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="arrows alternate horizontal" style={{marginLeft: "25px", marginTop: "50px"}} size="huge"/>
                            </Grid.Column>
                            <Grid.Column style={{marginLeft: "25px"}}>
                                <Grid.Row>
                                <Item.Content ><b>With this book</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row>
                                    <Item.Image src={swap.requestorBook!.image } size="tiny"/>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column style={{marginLeft: "25px", marginTop: "35px"}}>
                                <Grid.Row>
                                    <Item.Content><b>Contact details</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row >
                                    <Item.Content>{swap.requestor.email}</Item.Content>
                                    {swap.requestor.photos.length === 0 ? (
                                        <Icon name="user" size="big" />
                                    ) : (
                                        <Image src={swap.requestor.photos.find(image => image.isMain)?.url} size="tiny" />
                                    )}                                    <Item.Content>{swap.requestor.county}</Item.Content>
                                </Grid.Row>
                            </Grid.Column>


                        </Item>

                    ))}
                </Item.Group>
            </Segment>
        </>
    )
})