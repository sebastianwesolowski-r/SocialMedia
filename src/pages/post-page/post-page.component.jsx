import React, {useState, useEffect} from 'react';

import {Box} from '@material-ui/core';

import Loader from '../../components/loader/loader.component.jsx';

import FeedPost from '../../components/feed-post/feed-post.component';

import {getPostById} from '../../firebase/firebase';

const PostPage = ({match}) => {

    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            const fetchedPost = await getPostById(match.params.postId);
            return setPost(fetchedPost);
        };
        fetchPost();
    }, [match]);

    return (
        <>
            {
                post ? (
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%" marginTop="20px">
                        <FeedPost post={post}/>
                    </Box>
                ) : <Loader backdropOpen={!Boolean(post)}/>
            }
        </>
    );
}

export default PostPage;