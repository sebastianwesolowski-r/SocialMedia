import React from 'react';
import {connect} from 'react-redux';

import {selectPostLikes, selectPostComments} from '../../redux/posts/posts.selectors';

import {ReactComponent as LikesProfile} from '../../assets/likes-profile.svg';
import {ReactComponent as CommentsProfile} from '../../assets/comments-profile.svg'; 

import './profile-posts-item.styles.scss';

const ProfilePostsItem = ({userpost, postLikes, postComments}) => {
    const {image} = userpost;
    return (
        <div className="posts-item" style={{backgroundImage: `url(${image})`}}>
            <div className="post-panel">
                <div className="post-panel-item">
                    <LikesProfile />
                    <span>{postLikes.length}</span>
                </div>
                <div className="post-panel-item">
                    <CommentsProfile />
                    <span>{postComments.length}</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    postLikes: selectPostLikes(ownProps.userpost.id)(state),
    postComments: selectPostComments(ownProps.userpost.id)(state)
});

export default connect(mapStateToProps)(ProfilePostsItem);