import PostsActionTypes from './posts.types';
import UserActionTypes from '../user/user.types';
import {updatePost} from './posts.utils';

const INITIAL_STATE = {
    posts: [],
    profilePosts: [],
    isUploading: false,
    isFetching: false,
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
                posts: action.payload
            };
        case PostsActionTypes.FETCH_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case PostsActionTypes.FETCH_PROFILE_POSTS_START:
            return {
                ...state,
                isFetching: true
            };
        case PostsActionTypes.FETCH_PROFILE_POSTS_SUCCESS:
            return {
                ...state,
                profilePosts: action.payload,
                isFetching: false,
            };
        case PostsActionTypes.FETCH_PROFILE_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case PostsActionTypes.UPLOAD_POST_START:
            return {
                ...state,
                isUploading: true,
                error: null
            };
        case PostsActionTypes.UPLOAD_POST_SUCCESS:
            return {
                ...state,
                isUploading: false
            };
        case PostsActionTypes.UPLOAD_POST_FAILURE:
            return {
                ...state,
                isUploading: false,
                error: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                posts: null,
                profilePosts: null
            };
        case PostsActionTypes.UPDATE_POST:
            return {
                ...state,
                posts: updatePost(state.posts, action.payload)
            };
        default: return state;
    }
};

export default postsReducer;