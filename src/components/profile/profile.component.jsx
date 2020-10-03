import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Box, Avatar, Typography, IconButton, Menu, MenuItem, Modal, Grid} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import ModalBody from '../modal-body/modal-body.component';

import {selectUserProfile} from '../../redux/users/users.selectors';
import {selectUserPosts} from '../../redux/posts/posts.selectors';

const useStyles = makeStyles({
    avatar: {
        width: "80px",
        height: "80px",
        marginRight: "25px"
    },
    profilePanel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "100%",
        cursor: "pointer"
    },
    panelNumber: {
        fontSize: "1.2rem"
    },
    iconButton: {
        marginLeft: "auto"
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    imageBox: {
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
});

const Profile = ({user, userposts}) => {
    const classes = useStyles();

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const {displayName, followers, following} = user;

    const handleMenuClick = e => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="center" width="770px" height="100%" paddingTop="90px">
                <Box display="flex" alignItems="flex-start" width="100%" height="110px" padding="0 30px" border={1} borderLeft={0} borderTop={0} borderRight={0} borderColor="secondary.main">
                    <Avatar className={classes.avatar}><div /></Avatar>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between" width="50%" height="100%" paddingTop="5px" paddingBottom="20px">
                        <Typography variant="h6" style={{color: "#333333"}}>{displayName}</Typography>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="40px">
                            <div className={classes.profilePanel}>
                                <Typography className={classes.panelNumber} variant="body1" color="primary">{userposts.length}</Typography>
                                <Typography variant="subtitle2" style={{color: "#777777"}}>Posts</Typography>
                            </div>
                            <div className={classes.profilePanel} onClick={() => {setModalType('Followers'); setModalContent(followers); handleModalOpen();}}>
                                <Typography className={classes.panelNumber} variant="body1" color="primary">{followers.length}</Typography>
                                <Typography variant="subtitle2" style={{color: "#777777"}}>Followers</Typography>
                            </div>
                            <div className={classes.profilePanel} onClick={() => {setModalType('Following'); setModalContent(following); handleModalOpen();}}>
                                <Typography className={classes.panelNumber} variant="body1" color="primary">{following.length}</Typography>
                                <Typography variant="subtitle2" style={{color: "#777777"}}>Following</Typography>
                            </div>
                        </Box>
                    </Box>
                    <IconButton className={classes.iconButton} onClick={handleMenuClick}>
                        <MoreVert />
                    </IconButton>
                </Box>
                <Box width="100%" padding="15px 10px">
                    <Grid container spacing={2}>
                    {
                        userposts.map(userpost => (
                            <Grid item xs={4} key={userpost.id}>
                                <Box className={classes.imageBox} style={{backgroundImage: `url(${userpost.image})`}} width="250px" height="250px" border={2} borderRadius="5px" borderColor="secondary.main"/>
                            </Grid>
                        ))
                    }
                    </Grid>
                </Box>
            </Box>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem>Change Password</MenuItem>
                <MenuItem>Delete Account</MenuItem>
            </Menu>
            <Modal className={classes.modal} open={modalOpen} onClose={handleModalClose}>
                <ModalBody type={modalType} content={modalContent} />
            </Modal>
        </Box>
    );
};

const mapStateToProps = (state, ownProps) => ({
    user: selectUserProfile(ownProps.match.params.userName)(state),
    userposts: selectUserPosts(ownProps.match.params.userName)(state)
});

export default connect(mapStateToProps)(Profile);