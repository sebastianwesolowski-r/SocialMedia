import React from 'react';

import {Backdrop, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    backdrop: {
        zIndex: "10",
        backgroundColor: "rgba(0, 0, 0, 0.25)"
    }
});

const Loader = ({backdropOpen}) => {
    const classes = useStyles();

    return (
        <Backdrop classes={{root: classes.backdrop}} open={backdropOpen}>
            <CircularProgress size={80} color="primary" />
        </Backdrop>
    );
}

export default Loader;