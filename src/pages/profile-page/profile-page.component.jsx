import React from 'react';
import {Route} from 'react-router-dom';

import Profile from '../../components/profile/profile.component';

const ProfilePage = ({match}) => {
    return (
        <div>
            <Route path={`${match.path}/:userName`} component={Profile} />
        </div>
    );
};

export default ProfilePage;