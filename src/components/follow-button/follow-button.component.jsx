import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Spinner from '../spinner/spinner.component';

import {selectUsersData, selectIsDataLoaded} from '../../redux/users/users.selectors';

import {followUser, unfollowUser} from '../../redux/user/user.actions';

import './follow-button.styles.scss';

const FollowButton = ({currentUserName, user, followUser, unfollowUser, usersData, isDataLoaded}) => {
    const currentUserData = usersData[currentUserName];
    return (
        <div className="follow-button">
            {
                isDataLoaded ? (
                    currentUserData.following.includes(user.displayName) ? (
                        <div className="unfollow" onClick={() => unfollowUser({user, currentUserData})}>
                            Unfollow
                        </div>
                    ) : (
                        <div className="follow" onClick={() => followUser({user, currentUserData})}>
                            Follow
                        </div>
                    )
                ) : (
                    <Spinner />
                )
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    usersData: selectUsersData,
    isDataLoaded: selectIsDataLoaded
});

const mapDispatchToProps = dispatch => ({
    followUser: followData => dispatch(followUser(followData)),
    unfollowUser: followData => dispatch(unfollowUser(followData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);