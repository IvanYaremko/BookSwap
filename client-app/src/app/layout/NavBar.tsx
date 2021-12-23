import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

interface Props {
    openForm: () => void
}

export default function NavBar({openForm} : Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <Icon name='book' size="large" />
                </Menu.Item>
                <Menu.Item name="BookSwap" >

                </Menu.Item>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Add book'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}