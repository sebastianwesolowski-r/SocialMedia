import React from 'react';
import {connect} from 'react-redux';

import {Box} from '@material-ui/core';

import FeedPost from '../../components/feed-post/feed-post.component';

import {selectPostById} from '../../redux/posts/posts.selectors';

const PostPage = ({post}) => (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
            <FeedPost post={post}/>
        </Box>
);

const mapStateToProps = (state, ownProps) => ({
    post: selectPostById(ownProps.match.params.postId)(state)
});

export default connect(mapStateToProps)(PostPage);