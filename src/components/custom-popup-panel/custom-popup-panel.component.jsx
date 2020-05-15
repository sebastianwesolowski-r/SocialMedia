import React from 'react';

import {Link} from 'react-router-dom';

import ProfileSettings from '../profile-settings/profile-settings.component';

import './custom-popup-panel.styles.scss';

const CustomPopupPanel = ({items, type}) => {
    let keyCount = 0;
    const getKey = () => keyCount++;
    const switchItems = type => {
        switch(type) {
            case 'Likes': 
                return (
                    <div>
                        {
                            items.map(item => (
                                <div key={getKey()} className="like">
                                    <Link to={`/profile/${item}`}>
                                        {item}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                );
            case 'Comments':
                return (
                    <div>
                        {
                            items.map(item => (
                                <div key={getKey()} className="comment">
                                    <Link to={`/profile/${item.commentedBy}`}>
                                        <div className="username">{item.commentedBy}</div>
                                    </Link>
                                    <div className="content">{item.commentContent}</div>
                                </div>
                            ))
                        }
                    </div>
                );
            case 'Settings':
                return (
                    <ProfileSettings />
                );
            default:
                return (
                    <div />
                )
        }
    }
    return (
        <div className="custom-popup-panel">
            {
                switchItems(type)
            }
        </div>
    );
};

export default CustomPopupPanel;