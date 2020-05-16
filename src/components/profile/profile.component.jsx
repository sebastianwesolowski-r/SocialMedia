import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ReactComponent as Settings} from '../../assets/settings.svg';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUserProfile} from '../../redux/users/users.selectors';
import {selectUserPosts} from '../../redux/posts/posts.selectors';

import Loader from '../loader/loader.component';
import ProfilePanelItem from '../profile-panel-item/profile-panel-item.component';
import CustomButton from '../custom-button/custom-button.component';
import FollowButton from '../follow-button/follow-button.component';
import ProfilePosts from '../profile-posts/profile-posts.component';
import Follows from '../follows/follows.component';
import CustomPopup from '../custom-popup/custom-popup.component';

import './profile.styles.scss';
import Overlay from '../overlay/overlay.component';

const Profile = ({user, currentUser, userposts}) => {
    const [popup, setPopup] = useState(false);
    const userFollowers = user.followers;
    const userFollowing = user.following;
    const postsCount = userposts.length;
    const followersCount = user.followers.length;
    const followingCount = user.following.length;
    const [profileContent, setContent] = useState('posts');
    const setHidden = () => setPopup(!popup);
    const renderSwitch = (profileContent) => {
        switch(profileContent) {
            case 'posts': 
                return (
                    <ProfilePosts userposts={userposts} />
                );
            case 'followers':
                return (
                    <Follows follows={userFollowers}/>
                );
            case 'following':
                return (
                    <Follows follows={userFollowing}/>
                );
            default:
                return (
                    <ProfilePosts />
                );
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
                                currentUser.id !== user.id ? (
                                    <FollowButton currentUserName={currentUser.displayName} user={user}/>
                                ) : (
                                    <Settings className="settings" onClick={() => setHidden()}/>
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
                        <Link to="/feed">
                            <CustomButton>
                                    <div>back</div>
                            </CustomButton>
                        </Link>
                    </div>
                ) : (
                    <Loader />
                )
            }
            {
                popup ? (
                    <Overlay>
                        <CustomPopup type={'Settings'} items={null} setHidden={setHidden} />
                    </Overlay>
                ) : null
            }
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    currentUser: selectCurrentUser(state),
    user: selectUserProfile(ownProps.match.params.userName)(state),
    userposts: selectUserPosts(ownProps.match.params.userName)(state)
});

export default connect(mapStateToProps)(Profile);