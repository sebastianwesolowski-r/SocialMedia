import React, {useState} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {likePost, dislikePost, commentPost, deletePost} from '../../redux/posts/posts.actions';

import {ReactComponent as ProfileIcon} from '../../assets/profile-icon.svg';
import {ReactComponent as Close} from '../../assets/close.svg';
import {ReactComponent as DeletePost} from '../../assets/delete-post.svg';
import {ReactComponent as Likes} from '../../assets/likes-feed.svg';
import {ReactComponent as Liked} from '../../assets/liked.svg';
import {ReactComponent as Comments} from '../../assets/comments-feed.svg';
import {ReactComponent as UploadComment} from '../../assets/upload-comment.svg';

import Overlay from '../overlay/overlay.component';
import CustomPopup from '../custom-popup/custom-popup.component';

import './post-popup.styles.scss';

const PostPopup = ({userpost, currentUserName, postLikes, postComments, likePost, dislikePost, commentPost, deletePost, showPopup}) => {
    const {uploadedBy, image, message} = userpost;
    const postId = userpost.id;
    let keyCount = 0;
    const getKey = () => keyCount++;
    const [popup, setPopup] = useState(false);
    const setHidden = () => setPopup(!popup);
    const [comment, setComment] = useState('');
    const handleChange = event => {
        setComment(event.target.value);
    }
    return (
        <div>
            <div className="post-popup">
                <div className="image-section" style={{backgroundImage: `url(${image})`}}>
                    <div className="message-overlay">
                        {message}
                    </div>
                </div>
                <div className="user-section">
                    <div className="author">
                        <div className="author-username">
                            <ProfileIcon />
                            <span>{uploadedBy}</span>
                        </div>
                        <div className="navigation">
                            {
                                uploadedBy === currentUserName ? (
                                    <DeletePost onClick={() => deletePost(postId)}/>
                                ) : null
                            }
                            <Close onClick={() => showPopup()}/>
                        </div>
                    </div>
                    <div className="comments">
                        {
                            postComments.map(comment => (
                                <div key={getKey()} className="comment">
                                    <Link to={`/profile/${comment.commentedBy}`}>
                                        <div className="username">{comment.commentedBy}</div>
                                    </Link>
                                    <div className="content">{comment.commentContent}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="post-stats">
                        <div className="stat">
                            {
                                postLikes.includes(currentUserName) ? (
                                    <Liked onClick={() => dislikePost({currentUserName, postId})}/>
                                ) : (
                                    <Likes onClick={() => likePost({currentUserName, postId})} />
                                )
                            }
                            <span onClick={() => setPopup(true)}>{postLikes.length}</span>
                        </div>
                        <div className="stat">
                            <Comments />
                            <span>{postComments.length}</span>
                        </div>
                    </div>
                    <div className="upload-comment">
                        <input type="text" placeholder="write a comment ..." value={comment} onChange={handleChange} />
                        <UploadComment onClick={() => {commentPost({currentUserName, comment, postId}); setComment('');}} />
                    </div>
                </div>
            </div>
            {
                popup ? (
                    <Overlay overlayNone={true}>
                        <CustomPopup type={'Likes'} items={postLikes} setHidden={setHidden}/>
                    </Overlay>
                ) : null
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName
});

const mapDispatchToProps = dispatch => ({
    likePost: likeData => dispatch(likePost(likeData)),
    dislikePost: dislikeData => dispatch(dislikePost(dislikeData)),
    commentPost: commentData => dispatch(commentPost(commentData)),
    deletePost: postId => dispatch(deletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPopup);