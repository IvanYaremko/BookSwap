import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

/**
 * 
 */
export default observer(function SwapList() {
    const { swapStore } = useStore()
    const { myRequestsMap, deleteSwap } = swapStore



    function handleCancle(swapId: string) {
        deleteSwap(swapId)
    }

    return (
        <>
            {myRequestsMap.size === 0 ? (
                <h2>No requests made</h2>
            ) : (
                <Segment compact>
                    <Item.Group divided relaxed>
                        {Array.from(myRequestsMap.values()).map(request => (

                            <Item key={request.swapId}>
                                <Item.Image
                                    size='tiny'
                                    src={request.ownerBook.image}
                                />
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header >{request.ownerBook.title}</Item.Header>
                                    <Item.Content> {request.ownerBook.author} </Item.Content>
                                </Item.Content>
                                <Item.Meta hidden>{request.ownerBook.isbn13}</Item.Meta>
                                <Button
                                    content="cancel"
                                    size="tiny"
                                    style={{ height: '50px', width: '70px', marginTop: '75px' }}
                                    color='red'
                                    onClick={() => handleCancle(request.swapId)} />
                            </Item>
                        ))}
                    </Item.Group>
                </Segment>
            )}
        </>
    )
})