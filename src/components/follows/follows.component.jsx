import React from 'react';
import {Link} from 'react-router-dom';

import './follows.styles.scss';

const Follows = ({follows}) => {
    let keyCount = 0;
    const getKey = () => keyCount++;
    return (
        <div className="follows">
            {
                follows.map(follow => (
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


export default Follows;