import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";

export default observer(function HomePage() {
    const { userStore } = useStore()
    return (
        <Container style={{ marginTop: '7em' }}>
            <h1>Home page</h1>
            {userStore.checkLogin ? (
                <>
                    <Header as='h2'>Welcome to bookswap</Header>
                    <Button as={Link} to='/books' size='medium'>Go to BookSwap</Button>
                </>
            ) : (

                <>
                    <Button
                        size='medium'
                        as={Link} to='/login'>
                        Login
                    </Button>

                    <Button
                        size='medium'
                        as={Link} to='/register'>
                        Register
                    </Button>

                </>

            )}

        </Container>
    )
})