import React from 'react';

import './profile-panel-item.styles.scss';

const ProfilePanelItem = ({itemName, itemCount, invert, ...otherProps}) => (
    <div className={`profile-panel-item ${invert ? "invert" : ""}`} {...otherProps}>
        <span className="item-name">{itemName}</span>
        <span className="item-count">{itemCount}</span>
    </div>
);

export default ProfilePanelItem;