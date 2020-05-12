import React from 'react';

import {Link} from 'react-router-dom';

import {ReactComponent as Logo} from '../../assets/logo.svg';

import './app-baner.styles.scss';

const AppBaner = () => (
    <Link to="/feed">
        <div className="app-baner">
            <Logo />
            <div className="app-title">React Connect</div>
        </div>
    </Link>
);

export default AppBaner;