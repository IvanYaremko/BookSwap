import { observer } from "mobx-react-lite";
import React from "react";
import {  NavLink } from "react-router-dom";
import {  Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";
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
                <Menu.Item name="My Swaps" as={NavLink} to='/swaps'/>
                <Menu.Item as={NavLink} to='/createBook' positive content='Add book' /> 
                <Menu.Item as={NavLink} to='/history' positive content='History' /> 
                <Menu.Item as={NavLink} to={`/profile/${user?.userName}`} positive content='Profile' /> 
                <Menu.Item position="right">
                    <Image src={user?.image } avatar/>
                    <Dropdown text={user?.userName}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text='logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})