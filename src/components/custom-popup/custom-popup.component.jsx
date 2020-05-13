import React from 'react';

import {ReactComponent as Close} from '../../assets/close.svg';

import CustomPopupPanel from '../custom-popup-item/custom-popup-panel.component';

import './custom-popup.styles.scss';

const CustomPopup = ({type, items, setHidden}) => {
    //let keyCount = 0;
    //const getKey = () => keyCount++;
    return(
        <div className="overlay">
            <div className="popup">
                <div className="popup-type">
                    <span>{type}</span>
                    <Close onClick={() => setHidden()} />
                </div>
                <div className="popup-items">
                    <CustomPopupPanel items={items} type={type} />
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;