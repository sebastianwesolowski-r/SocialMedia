import React from 'react';
import {Link} from 'react-router-dom';

import './followers.styles.scss';

const Followers = ({user}) => {
    let keyCount = 0;
    const getKey = () => keyCount++;
    return (
        <div className="followers">
            {
                user.followers.map(follower => (
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