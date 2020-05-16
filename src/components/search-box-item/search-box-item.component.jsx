import React from 'react';

import {Link} from 'react-router-dom';

import './search-box-item.styles.scss';

const SearchBoxItem = ({userName, clearInput}) => {
    return (
        <div className="search-box-item" onClick={() => {document.querySelector('.search-box').value = ''; clearInput()}}>
            <Link to={`/profile/${userName}`}>
                {userName}
            </Link>
        </div>
    );
};

export default SearchBoxItem;