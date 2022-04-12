import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";

export default observer(function UserRequestList() {
    const { swapStore } = useStore()
    const { booksRequestedFromMe, setRequestor } = swapStore


    return (
        <>
            <Segment >
                <Item.Group divided relaxed>
                    {booksRequestedFromMe.map(user => (
                        
                        <Item key={user.userId}>
                            <Item.Content verticalAlign='middle'>
                                <Link to={`/requestor/${user.swapId}`} onClick={() => setRequestor(user.userId!)}><Item.Header>{user.userName}</Item.Header></Link>
                                <Item.Content> {user.county} </Item.Content>
                            </Item.Content>
                        </Item>                        
                    ))}

                </Item.Group>
            </Segment>
        </>
    )
})