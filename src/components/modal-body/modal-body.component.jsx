import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ReactComponent as UploadIcon} from '../../assets/upload-comment.svg';

import {Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, Button, InputBase, Zoom} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FormInput from '../form-input/form-input.component';

import {changeUserPassword, getUserAvatar} from '../../firebase/firebase';

import {deleteUserStart} from '../../redux/user/user.actions';
import {commentPost} from '../../redux/posts/posts.actions';

const useStyles  = makeStyles(theme => ({
    mainBody: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "400px",
        height: "500px",
        backgroundColor: theme.palette.common.white,
        borderRadius: "5px",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "50px",
        height: "50px",
        color: theme.palette.grey[50],
        backgroundColor: props => props.warning ? theme.palette.error.dark : theme.palette.primary.main,
        borderRadius: "5px 5px 0 0"
    },
    list: {
        width: "100%",
        paddingTop: "12px",
        overflowX: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            width: "8px"
        },
        "&::-webkit-scrollbar-track": {
            background: theme.palette.grey[400],
            boxShadow: "inset 0 0 5px #D3D3D3"
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.secondary.main
        }
    },
    link: {
        color: "#333333",
        textDecoration: "none"
    },
    uploadComment: {
        display: "flex",
        alignItems: "center",
        width: "400px",
        height: "55px",
        backgroundColor: theme.palette.grey[300],
        marginTop: "auto",
        borderRadius: "0 0 5px 5px",
        borderTop: `1px solid ${theme.palette.secondary.main}`
    },
    uploadCommentInput: {
        width: "100%",
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: "20px",
        color: "#333333",
        "& ::-webkit-input-placeholder": {
            color: theme.palette.primary.main
        }
    },
    uploadCommentBtn: {
        width: "40px",
        height: "30px",
        margin: theme.spacing(0, 2)
    },
    confirmBtn: {
        width: "120px",
        height: "35px"
    }
}));

const ModalBody = ({type, content, zoomin, currentUserName, currentUserId, postId, handleModalClose, commentPost, deleteUserAccount}) => {
    const classes = useStyles();

    const [avatars, setAvatars] = useState([]);
    const [comment, setComment] = useState('');
    const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
    const [passwordData, setPasswordData] = useState({currentPassword: "", newPassword: "", confirmNewPassword: "" });
    const {currentPassword, newPassword, confirmNewPassword} = passwordData;

    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    const handlePasswordChange = e => {
        const {name, value} = e.target;
        setPasswordData({...passwordData, [name]: value});
    };

    const handleCommentPost = e => {
        e.preventDefault();
        commentPost({postId, currentUserName, comment});
        handleModalClose();
    };

    const handlePasswordSet = e => {
        e.preventDefault();
        if(newPassword !== confirmNewPassword) {
            return console.log("Passwords didn't match");
        }
        changeUserPassword(currentPassword, newPassword);
        handleModalClose();
    };

    const deleteAccount = e => {
        e.preventDefault();
        deleteUserAccount({deleteAccountPassword, currentUserName, currentUserId});
        handleModalClose();
    };

    useEffect(() => {
        if(type === "Likes" || "Followers" || "Following" || "comments") {
            const getAvatars = async () => {
                const fetchAvatars = content.map(item => {
                    const avatar = (type === 'comments' ? getUserAvatar(item.commentedBy) : getUserAvatar(item));
                    return avatar;
                });

                const retrievedAvatars = await Promise.all(fetchAvatars);
                setAvatars(retrievedAvatars);
            }
            getAvatars();
        }
    }, [])

    const renderSwitch = type => {
        switch(type) {
            case 'Likes':
            case 'Followers':
            case 'Following':
                return (
                    <div className={classes.mainBody}>
                        <div className={classes.header}><Typography variant="h6">{type}</Typography></div>
                        <List className={classes.list}>
                            {
                                content.map((item, index) => (
                                    <ListItem key={item}>
                                        <ListItemAvatar>
                                            <Avatar src={avatars[index]}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={<Link className={classes.link} to={`/profile/${item}`} onClick={handleModalClose}>{item}</Link>}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                );
            case 'comments': return (
                <div className={classes.mainBody}>
                    <div className={classes.header}><Typography variant="h6">Comments</Typography></div>
                    <List className={classes.list}>
                        {
                            content.map((item, index) => (
                                    <ListItem key={`${item.commentedBy}${item.commentContent}`}>
                                        <ListItemAvatar>
                                            <Avatar src={avatars[index]} />
                                        </ListItemAvatar>
                                        <ListItemText primary={<Link className={classes.link} to={`/profile/${item.commentedBy}`} onClick={handleModalClose}>{item.commentedBy}</Link>} secondary={item.commentContent} />
                                    </ListItem>
                                )
                            )
                        }
                    </List>
                    <Paper component="form" onSubmit={handleCommentPost} className={classes.uploadComment}>
                        <InputBase className={classes.uploadCommentInput} value={comment} onChange={handleCommentChange} placeholder="Write a comment..." required/>
                        <Button className={classes.uploadCommentBtn} variant="contained" color="primary" type="submit"><UploadIcon /></Button>
                    </Paper>
                </div>
            );
            case 'change-password': return (
                <Box className={classes.mainBody} height="375px !important">
                    <div className={classes.header}><Typography variant="h6">Change Password</Typography></div>
                    <Box component="form" onSubmit={handlePasswordSet} display="flex" flexDirection="column" alignItems="center" width="100%" padding="0 50px" paddingTop="25px">
                        <FormInput name="currentPassword" type="password" label="Current Password" value={currentPassword} onChange={handlePasswordChange} smallMargin required/>
                        <FormInput name="newPassword" type="password" label="New Password" value={newPassword} onChange={handlePasswordChange} smallMargin required/>
                        <FormInput name="confirmNewPassword" type="password" label="Confirm Password" value={confirmNewPassword} onChange={handlePasswordChange} required/>
                        <Button className={classes.confirmBtn} variant="contained" color="primary" type="submit">Confirm</Button>
                    </Box>
                </Box>
            );
            case 'delete-account': return (
                <Box className={classes.mainBody} height="320px !important">
                    <Box className={classes.header} bgcolor="#f44336 !important"><Typography variant="h6">Delete Account</Typography></Box>
                    <Box component="form" onSubmit={deleteAccount} display="flex" flexDirection="column" alignItems="center" width="100%" padding="0 35px" paddingTop="25px">
                        <Typography variant="body1" style={{textAlign: "center", marginBottom: "30px"}}>All your posts and data will be permanently erased. Are you sure you want to delete your account ?</Typography>
                        <FormInput type="password" label="Current Password" value={deleteAccountPassword} onChange={e => setDeleteAccountPassword(e.target.value)} smallMargin required/>
                        <Button className={classes.confirmBtn} style={{marginTop: "15px", backgroundColor: "#f44336", color: "#FFFFFF"}} variant="contained" type="submit">Confirm</Button>
                    </Box>
                </Box>
            );
            default: return;
        }
    }

    return (
        <Zoom in={zoomin}>
            {
                renderSwitch(type)
            }
        </Zoom>
    );
};

const mapDispatchToProps = dispatch => ({
    commentPost: commentData => dispatch(commentPost(commentData)),
    deleteUserAccount: userData => dispatch(deleteUserStart(userData))
});

export default connect(null, mapDispatchToProps)(ModalBody);