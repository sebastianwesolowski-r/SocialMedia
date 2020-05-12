import React from 'react';

import ProfilePostsItem from '../profile-posts-item/profile-posts-item.component';

import './profile-posts.styles.scss';

const ProfilePosts = ({userposts}) => (
    <div className="posts">
        {
            userposts.map(userpost => (
                <ProfilePostsItem key={userpost.id} userpost={userpost} />
            ))
        }
    </div>
);

export default ProfilePosts;