import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectIsPostUpdating} from '../../redux/posts/posts.selectors';
import {uploadPostStart} from '../../redux/posts/posts.actions';
import {selectCurrentUserName} from '../../redux/user/user.selectors';

import Spinner from '../spinner/spinner.component';
import CustomButton from '../custom-button/custom-button.component';

import {ReactComponent as Close} from '../../assets/close.svg';

import './add-post.styles.scss';

const AddPost = ({setHidden, currentUserName, uploadPostStart, isUpdating}) => {
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
        <div className="add-post-page">
            <div className="add-post-panel">
                <Close className="close" onClick={() => setHidden()}/>
                <div>Add Post</div>
                <form onSubmit={handleSubmit}>
                    <input className="post-message" type="text" onChange={handleMessageChange} placeholder="Enter post message" value={postMessage} name="message" required/>    
                    <div className="imageupload">
                        Upload image
                        <input type="file" onChange={handleImageChange} title="Upload image" name="image" required/>    
                    </div>
                    <CustomButton type="submit">
                        {
                            isUpdating ? (
                                <Spinner />
                            ) : (
                                'Publish'
                            )
                        }
                    </CustomButton>
                </form>
            </div>
        </div>
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