import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../stores/Store";


export default function NavBar() {
    const {bookStore} = useStore()

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <Icon name='book' size="large" />
                </Menu.Item>
                <Menu.Item name="BookSwap" >

                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => bookStore.openForm()} positive content='Add book'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}