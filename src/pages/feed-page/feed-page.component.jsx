import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUsersData} from '../../redux/users/users.selectors';
import {fetchUsersStart} from '../../redux/users/users.actions';
import {fetchPostsStart} from '../../redux/posts/posts.actions';
import {selectPostsData} from '../../redux/posts/posts.selectors';

import FeedPost from '../../components/feed-post/feed-post.component';
import Loader from '../../components/loader/loader.component';

import './feed-page.styles.scss';

const FeedPage = ({currentUser, usersData, postsData, fetchUsersStart, fetchPostsStart}) => {
    
    useEffect(() => {
        if(!usersData && !postsData) {
            fetchUsersStart();
            fetchPostsStart();
        }
    });

    return (
        <div>
            {
                currentUser && usersData && postsData ? (
                    <div className="feed-page">
                        {
                            Object.values(postsData).filter(el => currentUser.following.includes(el.uploadedBy)).map(post => (
                                <FeedPost key={post.id} post={post} />
                            ))
                        }
                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    usersData: selectUsersData,
    postsData: selectPostsData
});

const mapDispatchToProps = dispatch => ({
    fetchUsersStart: () => dispatch(fetchUsersStart()),
    fetchPostsStart: () => dispatch(fetchPostsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);