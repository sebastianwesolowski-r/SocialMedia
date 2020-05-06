import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import usersReducer from './users/users.reducer';

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reduxPersistConfig = {
    key: 'root',
    storage,
    whiteList: ['users']
};

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer
});

export default persistReducer(reduxPersistConfig, rootReducer);