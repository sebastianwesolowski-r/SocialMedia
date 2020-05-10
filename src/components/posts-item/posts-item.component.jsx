import React from 'react';

import {ReactComponent as LikesProfile} from '../../assets/likes-profile.svg';
import {ReactComponent as CommentsProfile} from '../../assets/comments-profile.svg'; 

import './posts.styles.scss';

const PostsItem = ({userpost}) => {
    const {message, image, likes, comments} = userpost;
    const likesCount = likes.length;
    const commentsCount = comments.length;
    return (
        <div className="posts-item" style={{backgroundImage: `url(${image})`}}>
            <div className="post-panel">
                <div className="post-message">{message}</div>
                <div className="post-stats">
                    <div className="likes">
                        <LikesProfile className="post-stats-icon" />
                        <span>{likesCount}</span>
                    </div>
                    <div className="comments">
                        <CommentsProfile className="post-stats-icon" />
                        <span>{commentsCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsItem;