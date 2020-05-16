import React from 'react';

import './overlay.styles.scss';

const Overlay = ({children, overlayNone}) => (
    <div className={`${overlayNone ? 'overlay-none' : ""} overlay`}>
        {children}
    </div>
);

export default Overlay;