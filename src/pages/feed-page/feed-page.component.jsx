import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUsersData} from '../../redux/users/users.selectors';
import {fetchUsersStart} from '../../redux/users/users.actions';

import Loader from '../../components/loader/loader.component';

import './feed-page.styles.scss';

const FeedPage = ({currentUser, usersData, fetchUsersStart}) => {
    
    useEffect(() => {
        if(!usersData) {
            fetchUsersStart();
        }
    });

    return (
        <div>
            {
                currentUser && usersData ? (
                    <div className="feed-page">

                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    usersData: selectUsersData
});

const mapDispatchToProps = dispatch => ({
    fetchUsersStart: () => dispatch(fetchUsersStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);