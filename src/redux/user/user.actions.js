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

export const followUser = followData => ({
    type: UserActionTypes.FOLLOW_USER,
    payload: followData
});

export const unfollowUser = followData => ({
    type: UserActionTypes.UNFOLLOW_USER,
    payload: followData
});