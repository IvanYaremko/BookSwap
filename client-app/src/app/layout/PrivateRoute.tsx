import { observer } from "mobx-react-lite";
import { Component } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useStore } from "../stores/Store";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

/**
 * Private route that checks if user is logged in if not routed back to homepage
 */
export default observer(function PrivateRoute({ component: Component, ...rest }: Props) {
    const { userStore: { checkLogin } } = useStore();
    return (
        <Route
            {...rest}
            render={(props) => checkLogin ? (
                <Component {...props} />) : (
                <Redirect to='/' />)}
        />
    )

})