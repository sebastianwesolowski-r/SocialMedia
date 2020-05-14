import React from 'react';
import {Link} from 'react-router-dom';

import './followers.styles.scss';

const Followers = ({followers}) => {
    let keyCount = 0;
    const getKey = () => keyCount++;
    return (
        <div className="followers">
            {
                followers.map(follower => (
                    <div className="follower" key={getKey()}>
                        <Link to={`/profile/${follower}`}>
                            {follower}
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};


export default Followers;