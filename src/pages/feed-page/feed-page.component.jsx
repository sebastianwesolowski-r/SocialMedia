import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Box} from '@material-ui/core';

import FeedPost from '../../components/feed-post/feed-post.component';
import Loader from '../../components/loader/loader.component';
import AddPost from '../../components/add-post/add-post.component';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUsersData} from '../../redux/users/users.selectors';
import {fetchUsersStart} from '../../redux/users/users.actions';
import {fetchPostsStart} from '../../redux/posts/posts.actions';
import {selectUsersPosts} from '../../redux/posts/posts.selectors';

const FeedPage = ({currentUser, usersData, usersPosts, fetchUsersStart, fetchPostsStart}) => {

    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        if(!usersData && !usersPosts) {
            setBackdropOpen(true);
            fetchUsersStart();
            fetchPostsStart();
        }
    });

    useEffect(() => {
        if(usersData && usersPosts) {
            setBackdropOpen(false);
        }
    });

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" paddingTop="90px" style={{overflowY: "auto"}}>
            <AddPost />
            {
                currentUser && usersData && usersPosts ? (
                    <>
                        {
                            usersPosts.map(post => (
                                <FeedPost key={post.id} post={post} />
                            ))
                        }
                    </>
                ) : (
                    <Loader backdropOpen={backdropOpen} />
                )
            }
        </Box>
    );
};

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    usersData: selectUsersData,
    usersPosts: selectUsersPosts
});

const mapDispatchToProps = dispatch => ({
    fetchUsersStart: () => dispatch(fetchUsersStart()),
    fetchPostsStart: () => dispatch(fetchPostsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);