import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {selectPostLikes, selectPostComments} from '../../redux/posts/posts.selectors';
import {likePost, dislikePost, commentPost} from '../../redux/posts/posts.actions';

import {ReactComponent as ProfileIcon} from '../../assets/profile-icon.svg';
import {ReactComponent as Likes} from '../../assets/likes-feed.svg';
import {ReactComponent as Liked} from '../../assets/liked.svg';
import {ReactComponent as Comments} from '../../assets/comments-feed.svg';
import {ReactComponent as UploadComment} from '../../assets/upload-comment.svg';

import CustomPopup from '../custom-popup/custom-popup.component';

import './feed-post.styles.scss';

const FeedPost = ({post, currentUserName, likePost, dislikePost, commentPost, postLikes, postComments}) => {
    const {uploadedBy, image, message} = post;
    const postId = post.id;
    const [comment, setComment] = useState('');
    const [popup, setPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupItems, setPopupItems] = useState(null);
    const setHidden = () => setPopup(!popup);

    const handleChange = event => {
        setComment(event.target.value);
    }
    
    return (
        <div className="feed-post">
            <div className="uploaded-by">
                <ProfileIcon />
                <Link to={`profile/${uploadedBy}`}>
                    <span>{uploadedBy}</span>
                </Link>
            </div>
            <div className="image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="message">{message}</div>
            <div className="post-stats">
                <div className="stat">
                    {
                        postLikes.includes(currentUserName) ? (
                            <Liked onClick={() => dislikePost({currentUserName, postId})}/>
                        ) : (
                            <Likes onClick={() => likePost({currentUserName, postId})} />
                        )
                    }
                    <span onClick={() => {setPopupType('Likes'); setPopupItems(postLikes); setPopup(true);}}>{postLikes.length}</span>
                </div>
                <div className="stat">
                    <Comments />
                    <span onClick={() => {setPopupType('Comments'); setPopupItems(postComments); setPopup(true);}}>{postComments.length}</span>
                </div>
                {
                    popup ? (
                        <CustomPopup type={popupType} items={popupItems} setHidden={setHidden} />
                    ) : null
                }
            </div>
            <div className="upload-comment">
                <input type="text" placeholder="write a comment ..." value={comment} onChange={handleChange} />
                <UploadComment onClick={() => {commentPost({currentUserName, comment, postId}); setComment('');}} />
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    currentUserName: selectCurrentUserName(state),
    postLikes: selectPostLikes(ownProps.post.id)(state),
    postComments: selectPostComments(ownProps.post.id)(state)
});

const mapDispatchToProps = dispatch => ({
    likePost: likeData => dispatch(likePost(likeData)),
    dislikePost: dislikeData => dispatch(dislikePost(dislikeData)),
    commentPost: commentData => dispatch(commentPost(commentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);