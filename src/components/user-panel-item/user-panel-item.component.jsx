import React from 'react';
import {Link} from 'react-router-dom';

import './user-panel-item.styles.scss';

const UserPanelItem = ({url, panelFunction, icon, onClickFunction}) => {
    const item = (
        <div className="user-panel-item">
            <div className="panelFunction">{panelFunction}</div>
            <div className="icon">{icon}</div>
        </div>
    )
    return (
        <div>
        {
            url ? (
                <Link to={url}>
                    {item}
                </Link>
            ) : (
                <div onClick={onClickFunction}>
                    {item}
                </div>
            )
        }
        </div>
    );
};

export default UserPanelItem;