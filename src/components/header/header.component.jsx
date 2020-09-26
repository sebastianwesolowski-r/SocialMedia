import React from 'react';

import {ReactComponent as AppLogoSmall} from '../../assets/app-logo-small.svg';

import {AppBar, Box, Typography, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "55px",
        padding: "0 200px",
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        boxShadow: "none"
    },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.root}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="165px" height="100%">
                <AppLogoSmall />
                <Typography variant="h6" color="primary">React Connect</Typography>
            </Box>
        </AppBar>
    );
};

export default Header;