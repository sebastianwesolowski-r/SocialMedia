import {createSelector} from 'reselect';

const selectUsers = state => state.users;

export const selectUsersData = createSelector(
    [selectUsers],
    users => users.usersData
);

export const selectIsDataLoaded = createSelector(
    [selectUsers],
    users => users.isLoaded
);

export const selectUserProfile = userUrl => createSelector(
    [selectUsersData],
    users => (users ? users[userUrl] : null)
);