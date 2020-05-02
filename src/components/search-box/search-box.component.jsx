import React from 'react';

import './search-box.styles.scss';

const SearchBox = ({handleChange, placeholder}) => {
    return (
        <input className="search-box" type="search" onChange={handleChange} placeholder={placeholder}/>
    );
};

export default SearchBox;