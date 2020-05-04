import React from 'react';

import './follow-button.styles.scss';

const FollowButton = ({children, ...otherProps}) => (
    <div className="follow-button" {...otherProps}>
        {children}
    </div>
);

export default FollowButton;