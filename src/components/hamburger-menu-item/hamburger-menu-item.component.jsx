import React from 'react';
import {Link} from 'react-router-dom';

import './hamburger-menu-item.styles.scss';

const HamburgerMenuItem = ({url, panelFunction, icon, onClickFunction, setHamburgerMenu}) => {
    const item = (
        <div className="hamburger-menu-item" onClick={() => setHamburgerMenu()}>
            <div>{icon}</div>
            <div className="panel-function">{panelFunction}</div>
        </div>
    );
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
}

export default HamburgerMenuItem;