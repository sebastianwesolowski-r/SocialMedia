import React from 'react';

import {Link} from 'react-router-dom';

import './search-user-item.styles.scss';

const SearchUserItem = ({userName}) => {
    return (
        <div className="search-user-item">
            <Link to={`/profile/${userName}`}>
                {userName}
            </Link>
        </div>
    );
};

export default SearchUserItem;