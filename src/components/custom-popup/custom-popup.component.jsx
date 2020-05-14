import React from 'react';

import {ReactComponent as Close} from '../../assets/close.svg';

import CustomPopupPanel from '../custom-popup-panel/custom-popup-panel.component';

import './custom-popup.styles.scss';

const CustomPopup = ({type, items, setHidden, overlayNone}) => {
    return(
        <div className={`${overlayNone ? 'overlay-none' : ""} overlay`}>
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