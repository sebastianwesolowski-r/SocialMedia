import React, {useState} from 'react';
import {connect} from 'react-redux';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUserProfile} from '../../redux/users/users.selectors';
import {selectUserPosts, selectPostsData} from '../../redux/posts/posts.selectors';

import Loader from '../loader/loader.component';
import ProfilePanelItem from '../profile-panel-item/profile-panel-item.component';
import BackButton from '../back-button/back-button.component';
import FollowButton from '../follow-button/follow-button.component';
import ProfilePosts from '../profile-posts/profile-posts.component';
import Followers from '../followers/followers.component';
import Following from '../following/following.component';

import './profile.styles.scss';

const Profile = ({user, currentUser, userposts, posts}) => {
    const postsCount = userposts.length;
    const followersCount = user.followers.length;
    const followingCount = user.following.length;
    const [profileContent, setContent] = useState('posts');
    const renderSwitch = (profileContent) => {
        switch(profileContent) {
            case 'posts': 
                return (
                    <ProfilePosts userposts={userposts} />
                );
            case 'followers':
                return (
                    <Followers user={user}/>
                );
            case 'following':
                return (
                    <Following user={user}/>
                );
            default:
                return (
                    <ProfilePosts />
                )
        }
    }

    return (
        <div>
            {
                user && currentUser ? (
                    <div className="page">
                        <div className="profile">
                            <div className="profile-name">{user.displayName}</div>
                            {
                                currentUser.id !== user.id && (
                                    <FollowButton currentUserName={currentUser.displayName} user={user}/>
                                )
                            }
                            <div className="profile-panel">
                                <ProfilePanelItem itemName={"Posts: "} itemCount={postsCount} itemType={'posts'}  active={profileContent} onClick={() => setContent('posts')} />
                                <ProfilePanelItem itemName={"Followers: "} itemCount={followersCount} itemType={'followers'} active={profileContent} onClick={() => setContent('followers')} />
                                <ProfilePanelItem itemName={"Following: "} itemCount={followingCount} itemType={'following'} active={profileContent} onClick={() => setContent('following')} />
                            </div>
                            <div className="profile-content">
                                {
                                    renderSwitch(profileContent)
                                }
                            </div>
                        </div>
                        <BackButton />
                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    currentUser: selectCurrentUser(state),
    user: selectUserProfile(ownProps.match.params.userName)(state),
    userposts: selectUserPosts(ownProps.match.params.userName)(state),
    posts: selectPostsData(state)
});

export default connect(mapStateToProps)(Profile);