import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from '../../redux/user/user.selectors';

import Loader from '../../components/loader/loader.component';
import UserPanel from '../../components/user-panel/user-panel.component';

import './feed-page.styles.scss';

const FeedPage = ({currentUser}) => (
    <div>
        {
            currentUser ? (
                <div className="feed-page">
                    <UserPanel />
                </div>
            ) : (
                <Loader />
            )
        }
    </div>
);

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(FeedPage);