export const updatePost = (postsData, updatedPost) => {
    const postToUpdate = postsData.findIndex(post => post.id === updatedPost.id);
    postsData[postToUpdate] = updatedPost;
    return [...postsData];
};