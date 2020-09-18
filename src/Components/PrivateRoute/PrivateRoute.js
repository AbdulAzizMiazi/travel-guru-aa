import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userStatusContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const[userStatus, setUserStatus] = useContext(userStatusContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
        userStatus.authorized ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
};

export default PrivateRoute;