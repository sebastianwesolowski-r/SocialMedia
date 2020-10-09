import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as AppLogoSmall} from '../../assets/app-logo-small.svg';
import {ReactComponent as SearchIcon} from '../../assets/search.svg';
import {ReactComponent as HomeIcon} from '../../assets/home.svg';
import {ReactComponent as ProfileIcon} from '../../assets/profile.svg';
import {ReactComponent as SettingsIcon} from '../../assets/settings.svg';

import {AppBar, Toolbar, Box, Typography, InputBase, Menu, MenuItem, IconButton} from '@material-ui/core';
import {makeStyles, fade} from '@material-ui/core/styles';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

const useStyles = makeStyles(theme => ({
    root: {
        alignItems: "center",
        justifyContent: "center",
        height: "55px",
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: "none"
    },
    bar: {
        display: "flex",
        width: "1100px"
    },
    searchField: {
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: fade(theme.palette.primary.main, 0.05),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        width: "100%",
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        color: "#555555",
        "& ::-webkit-input-placeholder": {
            color: theme.palette.primary.main
        }
    },
    tab: {
        margin: "0 30px"
    },
    menu: {
        border: `1px solid ${theme.palette.secondary.main}`
    }
}));

const Header = ({currentUserName, signOut, history}) => {
    const classes = useStyles();

    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuClick = e => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar className={classes.bar}>
                <Box display="flex" flex="1" alignItems="center" justifyContent="center" width="195px" height="100%" marginRight="auto">
                    <AppLogoSmall style={{marginRight: "25px"}}/>
                    <Typography variant="h6" color="primary">React Connect</Typography>
                </Box>
                <Box className={classes.searchField} display="flex" flex="1" alignItems="center" width="260px" maxWidth="260px" height="35px" bgcolor="#EEEEEE" margin="0 auto">
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase className={classes.searchInput} placeholder="Search"/>
                </Box>
                <Box display="flex" flex="1" alignItems="center" justifyContent="center" marginLeft="auto">
                    <IconButton className={classes.tab} onClick={() => history.push("/feed")}>
                        <HomeIcon />
                    </IconButton>
                    <IconButton className={classes.tab} onClick={() => history.push(`/profile/${currentUserName}`)}>
                        <ProfileIcon />
                    </IconButton>
                    <IconButton className={classes.tab} onClick={handleMenuClick}>
                        <SettingsIcon />
                    </IconButton>
                </Box>
                <Menu anchorEl={menuAnchor} getContentAnchorEl={null} anchorOrigin={{vertical: "center", horizontal: "right"}} transformOrigin={{vertical: "top", horizontal: "left"}} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                    <MenuItem onClick={() => {handleMenuClose(); signOut()}}>Sign Out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));