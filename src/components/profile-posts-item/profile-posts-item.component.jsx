import React, {useState} from 'react';
import {connect} from 'react-redux';

import {selectPostLikes, selectPostComments} from '../../redux/posts/posts.selectors';
import {selectCurrentUserName} from '../../redux/user/user.selectors';

import {ReactComponent as LikesProfile} from '../../assets/likes-profile.svg';
import {ReactComponent as LikedProfile} from '../../assets/liked-profile.svg';
import {ReactComponent as CommentsProfile} from '../../assets/comments-profile.svg'; 

import PostPopup from '../post-popup/post-popup.component';

import './profile-posts-item.styles.scss';

const ProfilePostsItem = ({userpost, postLikes, postComments, currentUserName}) => {
    const {image} = userpost;
    const [popup, setPopup] = useState(false);
    const showPopup = () => setPopup(!popup);
    return (
        <div className="posts-item" style={{backgroundImage: `url(${image})`}}>
            <div className="post-panel" onClick={() => showPopup()}>
                <div className="post-panel-item">
                    {
                        postLikes.includes(currentUserName) ? (
                            <LikedProfile />
                        ) : (
                            <LikesProfile />
                        )
                    }
                    <span>{postLikes.length}</span>
                </div>
                <div className="post-panel-item">
                    <CommentsProfile />
                    <span>{postComments.length}</span>
                </div>
            </div>
            {
                popup ? (
                    <PostPopup userpost={userpost} postLikes={postLikes} postComments={postComments} showPopup={showPopup}/>
                ) : null
            }
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    postLikes: selectPostLikes(ownProps.userpost.id)(state),
    postComments: selectPostComments(ownProps.userpost.id)(state),
    currentUserName: selectCurrentUserName(state)
});

export default connect(mapStateToProps)(ProfilePostsItem);