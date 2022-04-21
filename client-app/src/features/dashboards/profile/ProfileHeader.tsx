import { observer } from "mobx-react-lite";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function ProfileHeader() { 
    const { userStore, bookStore, swapStore, profileStore } = useStore()
    const { user } = userStore
    const { ownedBooks } = bookStore
    const { swapHistory } = swapStore
    const {profile} = profileStore
    return (
        <>
            <Segment>
                <Grid columns={2} divided>

                    <Grid.Column width={12}>
                        <Item.Group>
                            <Item>
                                <Item.Image
                                    verticalAlign="middle"
                                    avatar
                                    size="small"
                                    src={profile?.image}
                                />
                                <Item.Content verticalAlign="middle">
                                    <Header as="h2" content={ profile?.userName}/>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={4}>
                            <Item style={{marginTop: '45px', marginLeft: "50px"}}>
                                <Item.Content verticalAlign="middle">
                                    <Header as="h3">{ownedBooks.length} books owned </Header>
                                </Item.Content>
                                <Item style={{marginTop: '10px'}}>
                                    <Item.Content verticalAlign="middle">
                                        <Header as="h3">{swapHistory.values.length} swaps made </Header>
                                    </Item.Content>
                                </Item>
                            </Item>
                    </Grid.Column>

                </Grid>
            </Segment>
        </>
    )
})