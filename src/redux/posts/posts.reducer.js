import PostsActionTypes from './posts.types';
import UserActionTypes from '../user/user.types';
import {updatePost} from './posts.utils';

const INITIAL_STATE = {
    posts: [],
    isUploading: false,
    isFetching: false,
    error: null,
    notification: {message: "", type: ""}
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
                error: action.payload,
                notification: {message: "Fetching posts failed Please try again later", type: "error"}
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
                isUploading: false,
                notification: {message: "Your post was successfully uploaded", type: "success"}
            };
        case PostsActionTypes.UPLOAD_POST_FAILURE:
            return {
                ...state,
                isUploading: false,
                error: action.payload,
                notification: {message: "There was a problem uploading your post", type: "error"}
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                posts: null
            };
        case PostsActionTypes.UPDATE_POST:
            return {
                ...state,
                posts: updatePost(state.posts, action.payload)
            };
        case PostsActionTypes.UPDATE_NOTIFICATION:
            return {
                ...state,
                notification: {message: action.payload.message, type: action.payload.type}
            };
        default: return state;
    }
};

export default postsReducer;