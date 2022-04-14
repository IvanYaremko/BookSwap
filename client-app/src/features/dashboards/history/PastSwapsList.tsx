import { observer } from "mobx-react-lite";
import { Grid, Icon, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function PastSwapsList() {
    const { swapStore } = useStore()
    const { swapHistoryArray } = swapStore

    return (
        <>
            <h1>Swap History</h1>
            <Segment compact>
                <Item.Group divided relaxed>
                    {swapHistoryArray.map(swap => (
                        <Item key={swap.swapId}>

                            <Grid.Column>
                                <Grid.Row>
                                <Item.Content ><b>You swapped</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row>
                                    <Item.Image src={swap.requesteeBook.image} size="tiny" />
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="refresh" style={{marginLeft: "25px", marginTop: "50px"}} size="large"/>
                            </Grid.Column>
                            <Grid.Column style={{marginLeft: "25px"}}>
                                <Grid.Row>
                                <Item.Content ><b>With this book</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row>
                                    <Item.Image src={swap.reqeustorBook.image } size="tiny"/>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column style={{marginLeft: "25px", marginTop: "35px"}}>
                                <Grid.Row>
                                    <Item.Content><b>Contact details</b></Item.Content>
                                </Grid.Row>
                                <Grid.Row >
                                    <Item.Content>{swap.requestorUser.email}</Item.Content>
                                    <Item.Content>{swap.requestorUser.county}</Item.Content>
                                </Grid.Row>
                            </Grid.Column>


                        </Item>

                    ))}
                </Item.Group>
            </Segment>
        </>
    )
})