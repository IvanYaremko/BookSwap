import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Icon, Menu } from "semantic-ui-react";


export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <Icon name='book' size="large" />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/books' name="BookSwap" >

                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createBook' positive content='Add book'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}