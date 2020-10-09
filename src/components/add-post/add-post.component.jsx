import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Send} from '../../assets/send.svg';
import {ReactComponent as SendImage} from '../../assets/send-image.svg';

import {Box, InputBase, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Spinner from '../spinner/spinner.component';

import {selectIsPostUploading} from '../../redux/posts/posts.selectors';
import {uploadPostStart} from '../../redux/posts/posts.actions';
import {selectCurrentUserName} from '../../redux/user/user.selectors';

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

const AddPost = ({currentUserName, uploadPostStart, isUploading}) => {
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
        <Box width="620px" height="100px" marginBottom="45px" padding="10px" paddingBottom="7px" bgcolor="common.white" border={1} borderColor="secondary.main" borderRadius={1}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <InputBase type="text" className={classes.textfield} value={postMessage} onChange={handleMessageChange} placeholder={`What are your thoughts, ${currentUserName}?`} required/>
                <div>
                    <Button type="submit" color="primary" variant="contained" className={classes.sendPostBtn} disabled={isUploading}>
                        {
                            isUploading ? (
                                <Spinner />
                            ) : (
                                <Send />
                            )
                        }
                    </Button>
                    <input accept="image/*" type="file" id="file-button" style={{display: "none"}} onChange={handleImageChange} required/>
                    <label htmlFor="file-button">
                        <Button color="primary" variant="contained" component="span"><SendImage /></Button>
                    </label>
                </div>
            </form>
        </Box>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName,
    isUploading: selectIsPostUploading
});

const mapDispatchToProps = dispatch => ({
    uploadPostStart: postData => dispatch(uploadPostStart(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);