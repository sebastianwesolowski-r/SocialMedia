import React from 'react';

import './custom-button.styles.scss';

const CustomButton = props => {
    const {children, googleSignIn, ...otherProps} = props;
    return (
        <button className={`${googleSignIn ? 'google-sign-in' : ""} custom-button`} {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;