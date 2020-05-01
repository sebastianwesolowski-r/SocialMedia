import {createSelector} from 'reselect';

const selectUsers = state => state.users;

export const selectUsersData = createSelector(
    [selectUsers],
    users => users.usersData
);