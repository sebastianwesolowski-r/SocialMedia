import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Box} from '@material-ui/core';

import FeedPost from '../../components/feed-post/feed-post.component';
import Loader from '../../components/loader/loader.component';
import AddPost from '../../components/add-post/add-post.component';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUsersPosts} from '../../redux/posts/posts.selectors';

const FeedPage = ({currentUser, usersPosts}) => (
    <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" paddingTop="90px" style={{overflowY: "auto"}}>
        <AddPost />
        {
            currentUser && usersPosts ? (
                <>
                    {
                        usersPosts.sort(({createdAt: previousDate}, {createdAt: currentDate}) => new Date(previousDate.seconds * 1000) - new Date(currentDate.seconds * 1000)).map(post => (
                            <FeedPost key={post.id} post={post} />
                        ))
                    }
                </>
            ) : (
                <Loader backdropOpen={currentUser && usersPosts ? false : true} />
            )
        }
    </Box>
);

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    usersPosts: selectUsersPosts
});

export default connect(mapStateToProps)(FeedPage);