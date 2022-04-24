import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";
/**
 * 
 */
export default observer(function HomePage() {
    const { userStore } = useStore()
    return (
        <Segment textAlign="center" vertical className="home" style={{ marginTop: "250px" }}>
            <Container text>
                <Header as="h1" content="BookSwap" >

                </Header>
                {userStore.checkLogin ? (
                    <>
                        <Button as={Link} to='/books' size='medium'>Go to BookSwap</Button>
                    </>
                ) : (

                    <>
                        <Button
                            size='medium'
                            as={Link} to='/login'
                            positive
                        >
                            Login
                        </Button>

                        <Button
                            size='medium'
                            as={Link} to='/register'
                            positive
                        >
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})