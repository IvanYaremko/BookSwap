import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean
    content?: string
}

/**
 * Simple loading component
 * @param param0 
 * @returns 
 */
export default function LoadingComponent({ inverted = true, content = 'loading...' }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}> 
            <Loader content={content} />
        </Dimmer>
    )
}