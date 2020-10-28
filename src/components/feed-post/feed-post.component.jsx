import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Like} from '../../assets/like.svg';
import {ReactComponent as Liked} from '../../assets/liked.svg';
import {ReactComponent as Comments} from '../../assets/comments.svg';

import {Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton, Menu, MenuItem, Modal, Avatar} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import ModalBody from '../modal-body/modal-body.component';

import {getUserAvatar} from '../../firebase/firebase';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {likePost, dislikePost, deletePost} from '../../redux/posts/posts.actions';

const useStyles = makeStyles(theme => ({
    card: {
        width: "90%",
        maxWidth: "614px",
        height: "605px",
        minHeight: "605px",
        backgroundColor: theme.palette.common.white,
        border: "1px solid #9ED4FF",
        borderRadius: "1px",
        marginBottom: "30px",
        boxShadow: "none"
    },
    headerTitle: {
        fontSize: "1rem",
        fontWeight: "500"
    },
    headerSubtitle: {
        fontSize: "0.8rem",
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
    },
    menuItem: {
        fontSize: "0.9rem",
        padding: "4px 25px"
    }
}));

const FeedPost = ({history, post, currentUserName, likePost, dislikePost, deletePost}) => {
    const classes = useStyles();
    const {id, uploadedBy, createdAt, image, message, likes, comments} = post;
    const [postAuthorAvatar, setPostAuthorAvatar] = useState('');
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const handleMenuClick = e => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const copyPostLink = () => {
        navigator.clipboard.writeText(`sw-social-media.netlify.app/#/post/${id}`);
        handleMenuClose();
    };

    const handlePostDelete = () => {
        deletePost(id);
        history.push(`/profile/${currentUserName}`);
    }

    const handleModalChange = (type, content) => {
        setModalType(type);
        setModalContent(content);
        handleModalOpen();
    };

    useEffect(() => {
        const getPostCreaterAvatar = async () => {
            const avatar = await getUserAvatar(uploadedBy);
            setPostAuthorAvatar(avatar);
        }
        getPostCreaterAvatar();
    }, []);

    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    classes={{title: classes.headerTitle, subheader: classes.headerSubtitle}}
                    avatar={<Avatar src={postAuthorAvatar}/>}
                    action={<IconButton onClick={handleMenuClick}><MoreVert/></IconButton>}
                    title={<Link className={classes.headerLink} to={`/profile/${uploadedBy}`}>{uploadedBy}</Link>}
                    subheader={new Date(createdAt.seconds * 1000).toLocaleDateString()}
                />
                <Menu anchorEl={menuAnchor} getContentAnchorEl={null} anchorOrigin={{vertical: "top", horizontal: "right"}} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                    <MenuItem classes={{root: classes.menuItem}} onClick={copyPostLink}>Copy Link</MenuItem>
                    {
                        currentUserName === uploadedBy ? (
                            <MenuItem onClick={handlePostDelete}>Delete Post</MenuItem>
                        ) : null
                    }
                </Menu>
                <CardMedia className={classes.media} image={image} />
                <CardContent>
                    <Typography style={{color: "#333333"}} variant="body1">{message}</Typography>
                </CardContent>
                <CardActions>
                    <div className={classes.stat}>
                        {
                            likes.includes(currentUserName) ? (
                                <IconButton onClick={() => dislikePost({currentUserName, id})}>
                                    <Liked />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => likePost({currentUserName, id})}>
                                    <Like />
                                </IconButton>
                            )
                        }
                        <Typography style={{cursor: "pointer", color: "#333333", fontSize: "1.2rem"}} variant="body1" onClick={() => handleModalChange("Likes", likes)}>{likes.length}</Typography>
                    </div>
                    <div className={classes.stat}>
                        <IconButton onClick={() => handleModalChange("comments", comments)}>
                            <Comments />
                        </IconButton>
                        <Typography style={{color: "#333333", fontSize: "1.2rem"}} variant="body1">{comments.length}</Typography>
                    </div>
                </CardActions>
            </Card>
            <Modal className={classes.modal} open={modalOpen} onClose={handleModalClose}>
                <div style={{outline: "none"}}>
                    <ModalBody zoomin={modalOpen} type={modalType} content={modalContent} currentUserName={currentUserName} postId={post.id} handleModalClose={handleModalClose}/>
                </div>
            </Modal>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName
});

const mapDispatchToProps = dispatch => ({
    likePost: likeData => dispatch(likePost(likeData)),
    dislikePost: dislikeData => dispatch(dislikePost(dislikeData)),
    deletePost: id => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FeedPost));