import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Send} from '../../assets/send.svg';
import {ReactComponent as SendImage} from '../../assets/send-image.svg';

import {Box, InputBase, Button, ButtonGroup} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {selectIsPostUpdating} from '../../redux/posts/posts.selectors';
import {uploadPostStart} from '../../redux/posts/posts.actions';
import {selectCurrentUserName} from '../../redux/user/user.selectors';

import Spinner from '../spinner/spinner.component';

const useStyles = makeStyles(theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
        height: "100%"
    },
    textfield: {
        width: "100%",
        height: "40px",
        color: "#333333",
        backgroundColor: theme.palette.grey[100],
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "2px",
        paddingLeft: "10px",
        "& ::-webkit-input-placeholder": {
            color: "#333333"
        }
    },
    sendPostBtn: {
        width: "90px",
        height: "30px",
        marginRight: "20px"
    },
    sendImageBtn: {
        width: "50px",
        height: "30px",
        padding: "0"
    }
}));

const AddPost = ({currentUserName, uploadPostStart, isUpdating}) => {
    const classes = useStyles();

    const [postMessage, setPostMessage] = useState('');
    const [postImage, setPostImage] = useState(null);
    const handleMessageChange = event => {
        setPostMessage(event.target.value);
    }
    const handleImageChange = event => {
        setPostImage(event.target.files[0]);
    }
    const handleSubmit = event => {
        event.preventDefault();
        uploadPostStart({postMessage, currentUserName, postImage});
    };

    return (
        <Box width="620px" height="100px" marginBottom="45px" padding="10px" paddingBottom="7px" bgcolor="common.white" border={1} borderColor="secondary.main" borderRadius={5}>
            <form className={classes.form}>
                <InputBase className={classes.textfield} placeholder={`What are your thoughts, ${currentUserName}?`}/>
                <div>
                    <Button color="primary" variant="contained" className={classes.sendPostBtn}><Send /></Button>
                    <Button color="primary" variant="contained" className={classes.sendImageBtn}><SendImage /></Button>
                </div>
            </form>
        </Box>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName,
    isUpdating: selectIsPostUpdating
});

const mapDispatchToProps = dispatch => ({
    uploadPostStart: postData => dispatch(uploadPostStart(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);