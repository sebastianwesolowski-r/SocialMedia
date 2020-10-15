import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import postsReducer from './posts/posts.reducer';

import {persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const reduxPersistConfig = {
    key: 'root',
    storage: storageSession,
    whiteList: ['users', 'posts']
};

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer
});

export default persistReducer(reduxPersistConfig, rootReducer);