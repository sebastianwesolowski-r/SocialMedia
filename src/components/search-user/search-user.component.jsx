import React from 'react';

import './search-user.styles.scss';

const SearchUser = ({handleChange}) => {
    return (
        <input className="search-user" type="search" onChange={handleChange} />
    );
};

export default SearchUser;