import UsersActionTypes from './users.types';

const INITIAL_STATE = {
    usersData: null,
    isLoaded: false,
    error: undefined
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UsersActionTypes.FETCH_USERS_START:
            return {
                ...state
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
        default: return state;
    }
};

export default usersReducer;