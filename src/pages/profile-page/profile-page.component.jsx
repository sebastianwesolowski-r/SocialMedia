import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {Box, Avatar, Typography, IconButton, Button, Menu, MenuItem, Modal, Grid} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import ModalBody from '../../components/modal-body/modal-body.component';
import Loader from '../../components/loader/loader.component';

import {followUser, unfollowUser} from '../../redux/user/user.actions';
import {fetchProfilePostsStart} from '../../redux/posts/posts.actions';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectUserProfile} from '../../redux/users/users.selectors';
import {selectUserProfilePosts} from '../../redux/posts/posts.selectors';

const useStyles = makeStyles({
    avatar: {
        width: "85px",
        height: "85px",
        marginRight: "32px"
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
    },
    followButton: {
        width: "105px",
        height: "30px",
        marginLeft: "auto"
    }
});

const ProfilePage = ({user, userProfilePosts, currentUser, fetchProfilePosts, followUser, unfollowUser}) => {
    const classes = useStyles();

    const [userData, setUserData] = useState({displayName: "", avatar: "", followers: [], following: []});
    const [followData, setFollowData] = useState({userId: "", userDisplayName: "", currentUserId: "", currentUserDisplayName: ""});
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const {displayName, avatar, followers, following} = userData;

    useEffect(() => {
        if(user) {
            setUserData({
                displayName: user.displayName,
                avatar: user.avatar,
                followers: user.followers,
                following: user.following
            });
            setFollowData({
                userId: user.id,
                userDisplayName: user.displayName,
                currentUserId: currentUser.id,
                currentUserDisplayName: currentUser.displayName
            });
            fetchProfilePosts(user.displayName);
        }
    }, [user])

    const handleMenuClick = e => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <>
            {
                userProfilePosts && user && currentUser ? (
                    <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" paddingTop="130px">
                        <Box display="flex" flexDirection="column" alignItems="center" width="770px" height="100%">
                            <Box display="flex" alignItems="flex-start" width="100%" height="110px" padding="0 30px" border={1} borderLeft={0} borderTop={0} borderRight={0} borderColor="secondary.main">
                                <Avatar className={classes.avatar} src={avatar}></Avatar>
                                <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between" width="50%" height="100%" paddingTop="5px" paddingBottom="20px">
                                    <Typography variant="h6" style={{color: "#333333"}}>{displayName}</Typography>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="40px">
                                        <div className={classes.profilePanel}>
                                            <Typography className={classes.panelNumber} variant="body1" color="primary">{userProfilePosts.length}</Typography>
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
                                {
                                    user.id === currentUser.id ? (
                                        <IconButton className={classes.iconButton} onClick={handleMenuClick}>
                                            <MoreVert />
                                        </IconButton>
                                    ) : (
                                        currentUser.following.includes(user.displayName) ? (
                                            <Button className={classes.followButton} variant="contained" color="primary" onClick={() => unfollowUser(followData)}>Unfollow</Button>
                                        ) : (
                                            <Button className={classes.followButton} variant="contained" color="secondary" onClick={() => followUser(followData)}>Follow</Button>
                                        )
                                    )
                                }
                            </Box>
                            <Box width="100%" padding="15px 10px">
                                <Grid container spacing={2}>
                                {
                                    userProfilePosts.map(userpost => (
                                        <Grid item xs={4} key={userpost.id}>
                                            <Box className={classes.imageBox} style={{backgroundImage: `url(${userpost.image})`}} width="250px" height="250px" border={1} borderRadius={1} borderColor="secondary.main"/>
                                        </Grid>
                                    ))
                                }
                                </Grid>
                            </Box>
                        </Box>
                        <Menu anchorEl={menuAnchor} anchorOrigin={{vertical: "center", horizontal: "right"}} transformOrigin={{vertical: "top", horizontal: "left"}} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                            <MenuItem>Change Password</MenuItem>
                            <MenuItem>Delete Account</MenuItem>
                        </Menu>
                        <Modal className={classes.modal} open={modalOpen} onClose={handleModalClose}>
                            <div style={{outline: "none"}}>
                                <ModalBody zoomin={modalOpen} type={modalType} content={modalContent} handleModalClose={handleModalClose} />
                            </div>
                        </Modal>
                    </Box>
                ) : (
                    <Loader backdropOpen={!Boolean(userProfilePosts)} />
                )
            }
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    user: selectUserProfile(ownProps.match.params.userName)(state),
    userProfilePosts: selectUserProfilePosts(state),
    currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    fetchProfilePosts: displayName => dispatch(fetchProfilePostsStart(displayName)),
    followUser: followData => dispatch(followUser(followData)),
    unfollowUser: followData => dispatch(unfollowUser(followData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);