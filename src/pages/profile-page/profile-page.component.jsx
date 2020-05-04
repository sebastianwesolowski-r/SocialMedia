import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Route, Redirect} from 'react-router-dom';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectAccess} from '../../redux/user/user.selectors';

import Loader from '../../components/loader/loader.component';
import Profile from '../../components/profile/profile.component';

const ProfilePage = ({access, match, currentUser}) => {
    return (
        <div>
            {
                access ? (
                    <div>
                        {
                            currentUser ? (
                                <Route path={`${match.path}/:userName`} component={Profile} />
                            ) : (
                                <Loader />
                            )
                        }
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    access: selectAccess
});

export default connect(mapStateToProps)(ProfilePage);