import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {IconButton, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Close} from '@material-ui/icons';

import {selectUserNotifications} from '../../redux/user/user.selectors';
import {selectPostsNotifications} from '../../redux/posts/posts.selectors';

const CustomAlert = (props) => <Alert variant="filled" {...props} />;

const SnackbarHandler = ({userNotification, postsNotification}) => {

    const [previousNotifications, setPreviousNotifications] = useState({userNotification, postsNotification});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [notificationData, setNotificationData] = useState({message: "", type: ""});
    const {message, type} = notificationData;

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if(reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if(userNotification.message !== previousNotifications.userNotification.message || userNotification.message === "There was a problem fulfilling this request") {
            const {message, type} = userNotification;
            setNotificationData({message, type});
            handleSnackbarOpen();
            setPreviousNotifications(userNotification);
        }
        if(postsNotification.message !==previousNotifications.postsNotification.message || postsNotification.message === "There was a problem fulfilling this request") {
            const {message, type} = postsNotification;
            setNotificationData({message, type});
            handleSnackbarOpen();
            setPreviousNotifications(postsNotification);
        }
    }, [userNotification, postsNotification]);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={snackbarOpen}
            autoHideDuration={3500}
            onClose={handleSnackbarClose}
            action={
                <IconButton size="small" aria-label="close" onClick={handleSnackbarClose}>
                    <Close fontSize="small" />
                </IconButton>
            }
        >
            <CustomAlert onClose={handleSnackbarClose} severity={type}>{message}</CustomAlert>
        </Snackbar>
    );
};

const mapStateToProps = createStructuredSelector({
    userNotification: selectUserNotifications,
    postsNotification: selectPostsNotifications
});

export default connect(mapStateToProps)(SnackbarHandler);