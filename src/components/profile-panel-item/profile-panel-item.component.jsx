import React from 'react';

import './profile-panel-item.styles.scss';

const ProfilePanelItem = ({itemName, itemCount, itemType, active, ...otherProps}) => (
    <div className={`profile-panel-item ${active === itemType ? "inverted" : ""}`} {...otherProps}>
        <span className="item-name">{itemName}</span>
        <span className="item-count">{itemCount}</span>
    </div>
);

export default ProfilePanelItem;