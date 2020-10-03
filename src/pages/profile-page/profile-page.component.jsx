import React from 'react';
import {Route} from 'react-router-dom';

import Profile from '../../components/profile/profile.component';

const ProfilePage = ({match}) => (
    <Route path={`${match.path}/:userName`} component={Profile} />
);

export default ProfilePage;