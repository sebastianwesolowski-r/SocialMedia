import React from 'react';

import PostsItem from '../posts-item/posts-item.component';

import './posts.styles.scss';

const Posts = ({userposts}) => (
    <div className="posts">
        {
            userposts.map(userpost => (
                <PostsItem key={userpost.id} userpost={userpost} />
            ))
        }
    </div>
);

export default Posts;