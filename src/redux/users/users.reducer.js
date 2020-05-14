import UsersActionTypes from './users.types';
import UserActionTypes from '../user/user.types';

const INITIAL_STATE = {
    usersData: null,
    isLoaded: false,
    error: null
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UsersActionTypes.FETCH_USERS_START:
            return {
                ...state,
                isLoaded: false,
                error: null
            };
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                usersData: action.payload,
                isLoaded: true
            };
        case UsersActionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                isLoaded: false,
                error: action.payload
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                usersData: null,
            };
        default: return state;
    }
};

export default usersReducer;