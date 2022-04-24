import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
/**
 * 
 */
export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Could not find 
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/books' primary>
                    return to books page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}