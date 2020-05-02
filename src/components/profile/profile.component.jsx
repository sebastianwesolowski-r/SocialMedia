import React from 'react';
import {connect} from 'react-redux';

import {selectUserProfile} from '../../redux/users/users.selectors';

import './profile.styles.scss';

const Profile = ({user}) => (
    <div className="profile">
        {
            user ? (
                (user.displayName)
            ) : null
        }
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    user: selectUserProfile(ownProps.match.params.userName)(state)
});

export default connect(mapStateToProps)(Profile);