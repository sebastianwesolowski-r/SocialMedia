import React from 'react';
import {Link} from 'react-router-dom';

import './following.styles.scss';

const Following = ({user}) => {
    let keyCount = 0;
    const getKey = () => keyCount++;
    return (
        <div className="following">
            {
                user.following.map(follow => (
                    <div className="follow" key={getKey()}>
                        <Link to={`/profile/${follow}`}>
                            {follow}
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};


export default Following;