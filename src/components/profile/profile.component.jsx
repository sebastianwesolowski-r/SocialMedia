import React, {useState} from 'react';
import {connect} from 'react-redux';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUserProfile} from '../../redux/users/users.selectors';

import {followUser} from '../../redux/user/user.actions';
import {unfollowUser} from '../../redux/user/user.actions';

import UserPanel from '../user-panel/user-panel.component';
import ProfilePanelItem from '../profile-panel-item/profile-panel-item.component';
import BackButton from '../back-button/back-button.component';
import FollowButton from '../follow-button/follow-button.component';
import Followers from '../followers/followers.component';
import Following from '../following/following.component';

import './profile.styles.scss';

const Profile = ({user, currentUser, followUser, unfollowUser}) => {
    const [profileContent, setContent] = useState('posts');
    const renderSwitch = (profileContent) => {
        switch(profileContent) {
            case 'posts': 
                return (
                    <div>posts</div>
                );
            case 'followers':
                return (
                    <Followers user={user} />
                );
            case 'following':
                return (
                    <Following user={user} />
                );
            default:
                return (
                    <div>posts</div>
                )
        }
    }

    return (
        <div className="page">
            <UserPanel />
                <div className="profile">
                    <div className="profile-name">{user.displayName}</div>
                    {
                        currentUser.id !== user.id && (
                            currentUser.following.find(el => el === user.displayName) ? (
                                <FollowButton onClick={() => unfollowUser({user, currentUser})}>
                                    Unfollow
                                </FollowButton>
                            ) : (
                                <FollowButton onClick={() => followUser({user, currentUser})}>
                                    Follow
                                </FollowButton>
                            )
                        )
                    }
                    <div className="profile-panel">
                        <ProfilePanelItem itemName={"Posts: "} itemCount={1} itemType={'posts'} onClick={() => setContent('posts')} />
                        <ProfilePanelItem itemName={"Followers: "} itemCount={1} itemType={'followers'} onClick={() => setContent('followers')} />
                        <ProfilePanelItem itemName={"Following: "} itemCount={1} itemType={'following'} onClick={() => setContent('following')} />
                    </div>
                    <div className="profile-content">
                        {
                            renderSwitch(profileContent)
                        }
                    </div>
                </div>
            <BackButton />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    currentUser: selectCurrentUser(state),
    user: selectUserProfile(ownProps.match.params.userName)(state)
});

const mapDispatchToProps = dispatch => ({
    followUser: followData => dispatch(followUser(followData)),
    unfollowUser: followData => dispatch(unfollowUser(followData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);