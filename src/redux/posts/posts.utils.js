export const updatePost = (postsData, updatedPost) => {
    postsData[updatedPost.id] = updatedPost;
    return postsData;
};