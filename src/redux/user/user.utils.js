export const updateFollowingsOnFollow = (currentUser, followedUserDisplayName, ) => {
    currentUser.following = [...currentUser.following, followedUserDisplayName];
    return {...currentUser};
};

export const updateFollowingsOnUnfollow = (currentUser, followedUserDisplayName, ) => {
    currentUser.following = currentUser.following.filter(follower => follower !== followedUserDisplayName);
    return {...currentUser};
};