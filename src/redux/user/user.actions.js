import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const facebookSignInStart = () => ({
    type: UserActionTypes.FACEBOOK_SIGN_IN_START
})

export const emailSignInStart = userData => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: userData
});

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = userData => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userData
});

export const signUpSuccess = () => ({
    type: UserActionTypes.SIGN_UP_SUCCESS
});

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

export const deleteUserStart = userData => ({
    type: UserActionTypes.DELETE_USER_START,
    payload: userData
});

export const followUserStart = followData => ({
    type: UserActionTypes.FOLLOW_USER_START,
    payload: followData
});

export const followUserSuccess = followedUserDisplayName => ({
    type: UserActionTypes.FOLLOW_USER_SUCCESS,
    payload: followedUserDisplayName
});

export const followUserFailure = error => ({
    type: UserActionTypes.FOLLOW_USER_FAILURE,
    payload: error
});

export const unfollowUserStart = followData => ({
    type: UserActionTypes.UNFOLLOW_USER_START,
    payload: followData
});

export const unfollowUserSuccess = followedUserDisplayName => ({
    type: UserActionTypes.UNFOLLOW_USER_SUCCESS,
    payload: followedUserDisplayName
});

export const unfollowUserFailure = error => ({
    type: UserActionTypes.UNFOLLOW_USER_FAILURE,
    payload: error
});