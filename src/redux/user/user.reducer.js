import UserActionTypes from './user.types';

import {updateFollowingsOnFollow, updateFollowingsOnUnfollow} from './user.utils';

const INITIAL_STATE = {
    access: false,
    currentUser: null,
    isProcessing: false,
    error: null,
    notification: {message: "", type: ""}
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.EMAIL_SIGN_IN_START:
        case UserActionTypes.SIGN_UP_START:
            return {
                ...state,
                isProcessing: true,
                error: null
            };
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                notification: {message: "Your account was successfully created", type: "success"}
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                access: true,
                currentUser: action.payload,
                isProcessing: false,
                error: null
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                access: false,
                currentUser: null,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                access: false,
                isProcessing: false,
                error: action.payload,
                notification: {message: "There was a problem fulfilling this request", type: "error"}
            };
        case UserActionTypes.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                currentUser: updateFollowingsOnFollow(state.currentUser, action.payload)
            };
        case UserActionTypes.UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                currentUser: updateFollowingsOnUnfollow(state.currentUser, action.payload)
            };
        case UserActionTypes.FOLLOW_USER_FAILURE:
        case UserActionTypes.UNFOLLOW_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                notification: {message: "There was a problem fulfilling this request", type: "error"}
            };
        case UserActionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                access: false,
                currentUser: null,
                notification: {message: "Your account was successfully deleted", type: "success"}
            };
        case UserActionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                notification: {message: "There was a problem deleting your account", type: "error"}
            };
        default: return state;
    }
};

export default userReducer;