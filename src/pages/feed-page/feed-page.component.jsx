import React from 'react';

import UserPanel from '../../components/user-panel/user-panel.component';

import './feed-page.styles.scss';

const FeedPage = ({match}) => (
    <div className="feed-page">
        <UserPanel />
    </div>
);

export default FeedPage;