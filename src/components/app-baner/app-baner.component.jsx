import React from 'react';

import {ReactComponent as Logo} from '../../assets/logo.svg';

import './app-baner.styles.scss';

const AppBaner = () => (
    <div className="app-baner">
        <Logo />
        <div className="app-title">React Connect</div>
    </div>
);

export default AppBaner;