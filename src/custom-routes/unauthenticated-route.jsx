import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const UnauthenticatedRoute = ({component: Component, appProps, ...rest}) => (
    <Route {...rest}
        render={props =>
            !appProps.access ? (
                <Component {...props} {...appProps} />
            ) : (
                <Redirect to="/feed" />
            )
        }
    />
);

export default UnauthenticatedRoute;
//<Route path={`${match.path}/:userName`} component={Profile} />