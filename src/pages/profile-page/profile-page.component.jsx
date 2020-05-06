import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Route, Redirect} from 'react-router-dom';

import {selectAccess} from '../../redux/user/user.selectors';

import Profile from '../../components/profile/profile.component';

const ProfilePage = ({access, match}) => {
    return (
        <div>
            {
                access ? (
                    <Route path={`${match.path}/:userName`} component={Profile} />
                ) : (
                    <Redirect to="/" />
                )
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    access: selectAccess
});

export default connect(mapStateToProps)(ProfilePage);