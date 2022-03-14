import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../stores/Store";


export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore()

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <Icon name='book' size="large" />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/books' name="Market" />
                <Menu.Item name="My Swaps" />
                <Menu.Item as={NavLink} to='/createBook' positive content='Add book' /> 
                <Menu.Item position="right">
                    <Dropdown icon='cog'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})