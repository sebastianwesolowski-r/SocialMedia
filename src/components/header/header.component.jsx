import React from 'react';

import {ReactComponent as Logo} from '../../assets/logo.svg';

import './header.styles.scss';

const Header = () => (
    <div className="header">
        <Logo />
        <div className="title">React Connect</div>
    </div>
);

export default Header;