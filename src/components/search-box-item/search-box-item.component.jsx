import React from 'react';

import {Link} from 'react-router-dom';

import './search-box-item.styles.scss';

const SearchBoxItem = ({userName}) => {
    return (
        <div className="search-box-item">
            <Link to={`/profile/${userName}`}>
                {userName}
            </Link>
        </div>
    );
};

export default SearchBoxItem;