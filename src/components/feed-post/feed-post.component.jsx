import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ReactComponent as ProfileIcon} from '../../assets/profile-icon.svg';
import {ReactComponent as Likes} from '../../assets/likes-feed.svg';
import {ReactComponent as Liked} from '../../assets/liked.svg';
import {ReactComponent as Comments} from '../../assets/comments-feed.svg';

import {Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton, Menu, MenuItem, Modal} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import ModalBody from '../modal-body/modal-body.component';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {selectPostLikes, selectPostComments} from '../../redux/posts/posts.selectors';
import {likePost, dislikePost} from '../../redux/posts/posts.actions';

const useStyles = makeStyles(theme => ({
    root: {
        width: "90%",
        maxWidth: "614px",
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "5px",
        marginBottom: "30px"
    },
    headerTitle: {
        fontSize: "1rem",
        fontWeight: "500"
    },
    headerLink: {
        color: "#333333",
        textDecoration: "none"
    },
    media: {
        height: "410px"
    },
    stat: {
        display: "flex",
        alignItems: "center",
        marginRight: "22px"
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const FeedPost = ({post, currentUserName, likePost, dislikePost, postLikes, postComments}) => {
    const classes = useStyles();
    const {id, uploadedBy, image, message} = post;
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const handleMenuClick = e => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    classes={{title: classes.headerTitle}}
                    avatar={<ProfileIcon />}
                    action={<IconButton><MoreVert onClick={handleMenuClick}/></IconButton>}
                    title={<Link className={classes.headerLink} to={`profile/${uploadedBy}`}>{uploadedBy}</Link>}
                    subheader="data posta"
                />
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                    <MenuItem>Copy Link</MenuItem>
                </Menu>
                <CardMedia className={classes.media} image={image} />
                <CardContent>
                    <Typography variant="body1" color="#333333">{message}</Typography>
                </CardContent>
                <CardActions>
                    <div className={classes.stat}>
                        {
                            postLikes.includes(currentUserName) ? (
                                <IconButton onClick={() => dislikePost({currentUserName, id})}>
                                    <Liked />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => likePost({currentUserName, id})}>
                                    <Likes />
                                </IconButton>
                            )
                        }
                        <Typography style={{cursor: "pointer"}} variant="body1" color="#333333" onClick={() => {setModalType('Likes'); setModalContent(postLikes); handleModalOpen();}}>{postLikes.length}</Typography>
                    </div>
                    <div className={classes.stat}>
                        <IconButton>
                            <Comments />
                        </IconButton>
                        <Typography style={{cursor: "pointer"}} variant="body1" color="#333333" onClick={() => {setModalType('comments'); setModalContent(postComments); handleModalOpen();}}>{postComments.length}</Typography>
                    </div>
                </CardActions>
            </Card>
            <Modal className={classes.modal} open={modalOpen} onClose={handleModalClose}>
                <ModalBody type={modalType} content={modalContent} />
            </Modal>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    currentUserName: selectCurrentUserName(state),
    postLikes: selectPostLikes(ownProps.post.id)(state),
    postComments: selectPostComments(ownProps.post.id)(state)
});

const mapDispatchToProps = dispatch => ({
    likePost: likeData => dispatch(likePost(likeData)),
    dislikePost: dislikeData => dispatch(dislikePost(dislikeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);