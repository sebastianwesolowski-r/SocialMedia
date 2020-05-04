import React from 'react';

import {Link} from 'react-router-dom';

import './back-button.styles.scss';

const BackButton = () => (
    <Link to="/feed">
        <button className="back-button">
            back
        </button>
    </Link>
);

export default BackButton;