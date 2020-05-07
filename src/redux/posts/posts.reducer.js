import PostsActionTypes from './posts.types';

const INITIAL_STATE = {
    isUpdating: false,
    error: null
};

const postsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PostsActionTypes.UPLOAD_POST_START:
            return {
                ...state,
                isUpdating: true
            };
        case PostsActionTypes.UPLOAD_POST_SUCCESS:
            return {
                ...state,
                isUpdating: false
            };
        case PostsActionTypes.UPLOAD_POST_FAILURE:
            return {
                isUpdating: false,
                error: action.payload
            }
        default: return state;
    }
};

export default postsReducer;