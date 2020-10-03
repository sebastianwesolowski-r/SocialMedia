import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthenticatedRoute = ({component: Component, appProps, ...rest}) => (
    <Route {...rest}
        render={props =>
            appProps.access ? (
                <Component {...props} {...appProps} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

export default AuthenticatedRoute;