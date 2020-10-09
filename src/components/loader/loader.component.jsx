import React from 'react';

import {Backdrop, CircularProgress} from '@material-ui/core';

const Loader = ({backdropOpen}) => (
    <Backdrop style={{zIndex: "10"}} open={backdropOpen}>
        <CircularProgress color="primary" />
    </Backdrop>
);

export default Loader;