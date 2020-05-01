import React from 'react';

import './search-user-item.styles.scss';

const SearchUserItem = ({userName}) => {
    return (
        <div className="search-user-item">
            {userName}
        </div>
    );
};

export default SearchUserItem;