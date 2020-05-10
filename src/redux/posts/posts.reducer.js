import PostsActionTypes from './posts.types';
import UserActionTypes from '../user/user.types';

const INITIAL_STATE = {
    postsData: null,
    isUpdating: false,
    error: null
};

const postsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PostsActionTypes.FETCH_POSTS_START:
            return {
                ...state,
                error: null
            };
        case PostsActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                postsData: action.payload
            };
        case PostsActionTypes.FETCH_POSTS_FAILURE: 
            return {
                ...state,
                error: action.payload
            };
        case PostsActionTypes.UPLOAD_POST_START:
            return {
                ...state,
                isUpdating: true,
                error: null
            };
        case PostsActionTypes.UPLOAD_POST_SUCCESS:
            return {
                ...state,
                isUpdating: false
            };
        case PostsActionTypes.UPLOAD_POST_FAILURE:
            return {
                ...state,
                isUpdating: false,
                error: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                postsData: null
            };
        default: return state;
    }
};

export default postsReducer;