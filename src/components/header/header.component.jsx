import React, {useState, useRef} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as AppLogoSmall} from '../../assets/app-logo-small.svg';
import {ReactComponent as SearchIcon} from '../../assets/search.svg';
import {ReactComponent as HomeIcon} from '../../assets/home.svg';
import {ReactComponent as ProfileIcon} from '../../assets/profile.svg';
import {ReactComponent as SettingsIcon} from '../../assets/settings.svg';
import {ReactComponent as SignOutIcon} from '../../assets/sign-out.svg';

import {AppBar, Toolbar, Box, Typography, InputBase, Menu, MenuItem, ListItemIcon, ListItemText, IconButton, Popover, Avatar} from '@material-ui/core';
import {More, MoreVert} from '@material-ui/icons';
import {makeStyles, fade} from '@material-ui/core/styles';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

import {searchUserProfile} from '../../firebase/firebase';

const useStyles = makeStyles(theme => ({
    appBar: {
        alignItems: "center",
        justifyContent: "center",
        height: "55px",
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: "none"
    },
    bar: {
        display: "flex",
        width: "80%",
        [theme.breakpoints.down('md')]: {
            width: "95%"
        },
    },
    appName: {
        [theme.breakpoints.down('md')]: {
            display: "none"
        },
    },
    searchField: {
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: fade(theme.palette.primary.main, 0.05),
        },
    },
    searchIcon: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: "pointer"
    },
    searchInput: {
        width: "220px",
        padding: theme.spacing(1, 1, 1, 0),
        color: "#555555",
        "& ::-webkit-input-placeholder": {
            color: theme.palette.primary.main
        }
    },
    tab: {
        margin: "0 25px"
    },
    menu: {
        [theme.breakpoints.down('md')]: {
            display: "none"
        },
    },
    menuItem: {
        fontSize: "0.9rem",
        padding: "4px 25px"
    },
    mobileMenu: {
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: "block"
        }
    },
    mobileMenuButton: {
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: "block",
            marginLeft: "15px",
            marginRight: "-15px"
        },
    },
    popover: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "250px",
        height: "45px"
    },
    popoverAvatar: {
        width: "35px",
        height: "35px",
        marginRight: "20px"
    },
    popoverLink: {
        fontSize: "1rem",
        fontWeight: "500",
        color: "#333333",
        textDecoration: "none"
    }
}));

const Header = ({currentUserName, signOut, history}) => {
    const classes = useStyles();

    const appBarRef = useRef();

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const handleMenuClick = e => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleMobileMenuClick = e => setMobileMenuAnchor(e.currentTarget);
    const handleMobileMenuClose = () => setMobileMenuAnchor(null);

    const handlePopoverClose = () => setSearchResult(null);

    const handleChange = e => {
        setSearchValue(e.target.value);
    };

    const foundUserCb = (user, error) => {
        if(error) {
            return setSearchResult(error);
        }
        setSearchResult(user);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await searchUserProfile(searchValue, foundUserCb);
    };

    return (
        <>
            <AppBar ref={appBarRef} position="fixed" className={classes.appBar}>
                <Toolbar className={classes.bar}>
                    <Box style={{cursor: "pointer"}} display="flex" flex="1" alignItems="center" justifyContent="center" width="195px" height="100%" marginRight="auto" onClick={() => history.push("/feed")}>
                        <AppLogoSmall style={{marginRight: "25px"}}/>
                        <Typography className={classes.appName} variant="h6" color="primary">React Connect</Typography>
                    </Box>
                    <Box className={classes.searchField} component="form" onSubmit={handleSubmit} display="flex" flex="1" alignItems="center" justifyContent="space-between" width="260px" maxWidth="260px" height="35px" bgcolor="#EEEEEE" margin="0 auto">
                        <IconButton type="submit" className={classes.searchIcon}>
                            <SearchIcon />
                        </IconButton>
                        <InputBase className={classes.searchInput} value={searchValue} onChange={handleChange} placeholder="Search"/>
                    </Box>
                    <Box className={classes.menu} display="flex" flex="1" alignItems="center" justifyContent="center" width="400px" marginLeft="auto">
                        <IconButton className={classes.tab} onClick={() => history.push("/feed")}>
                            <HomeIcon />
                            <Typography variant="body2" color="primary">Home</Typography>
                        </IconButton>
                        <IconButton className={classes.tab} onClick={() => history.push(`/profile/${currentUserName}`)}>
                            <ProfileIcon />
                            <Typography variant="body2" color="primary">Profile</Typography>
                        </IconButton>
                        <IconButton className={classes.tab} onClick={handleMenuClick}>
                            <SettingsIcon />
                            <Typography variant="body2" color="primary">Settings</Typography>
                        </IconButton>
                    </Box>
                    <IconButton className={classes.mobileMenuButton} color="primary" onClick={handleMobileMenuClick}>
                        <MoreVert />
                    </IconButton>
                    <Menu anchorEl={menuAnchor} getContentAnchorEl={null} anchorOrigin={{vertical: "bottom", horizontal: "center"}} transformOrigin={{vertical: "top", horizontal: "left"}} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                        <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleMenuClose(); signOut()}}>Sign Out</MenuItem>
                    </Menu>
                    <Menu className={classes.mobileMenu} anchorEl={mobileMenuAnchor} getContentAnchorEl={null} anchorOrigin={{vertical: "bottom", horizontal: "center"}} transformOrigin={{vertical: "top", horizontal: "left"}} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
                        <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleMobileMenuClose(); history.push("/feed")}}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </MenuItem>
                        <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleMobileMenuClose(); history.push(`/profile/${currentUserName}`)}}>
                            <ListItemIcon><ProfileIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </MenuItem>
                        <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleMobileMenuClose(); signOut()}}>
                            <ListItemIcon><SignOutIcon /></ListItemIcon>
                            <ListItemText primary="Sign Out" />
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Popover anchorEl={appBarRef.current} open={Boolean(searchResult)} onClose={handlePopoverClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} transformOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Box display="flex" alignItems="center" justifyContent="center" width="250px" padding="12px 0">
                    {
                        typeof(searchResult) === "object" ? (
                            <>
                                <Avatar className={classes.popoverAvatar} src={searchResult ? searchResult.avatar : null} />
                                <Link className={classes.popoverLink} to={`/profile/${searchResult ? searchResult.displayName : null}`}>{searchResult ? searchResult.displayName : null}</Link>
                            </>
                           ) : (
                                <Typography variant="body1">{searchResult ? searchResult : null}</Typography>
                           )
                    }
                </Box>
            </Popover>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));