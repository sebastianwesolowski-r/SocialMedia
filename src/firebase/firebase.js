import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import config from './config';

firebase.initializeApp(config);

export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
facebookProvider.setCustomParameters({prompt: 'select_account'});
export const firebaseSignInGoogle = () => auth.signInWithPopup(googleProvider);
export const firebaseSignInFacebook = () => auth.signInWithPopup(facebookProvider);

export const loginUser = userAuth => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    return userRef;
};

export const registerUser = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const newUserRef = firestore.doc(`users/${userAuth.uid}`);
    const {displayName, email} = userAuth;
    const avatar = `https://api.adorable.io/avatars/85/${email}.png`;
    const createdAt = new Date();
    const followers = [];
    const following = ["Sebastian Wesołowski"];
    const adminRef = firestore.doc("users/ZPcaaNBB2BhqTKQkfbzXsivdiph1");
    try {
        await newUserRef.set({
            displayName,
            email,
            avatar,
            createdAt,
            followers,
            following,
            ...additionalData
        });
        await adminRef.update({
            followers: firebase.firestore.FieldValue.arrayUnion(displayName ? displayName : additionalData.displayName)
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

export const changeUserPassword = (presentPassword, newPassword) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        presentPassword
    );
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.updatePassword(newPassword);
        alert('Password updated successfully');
    })
    .catch(error => alert(error.message));
};

export const deleteUserAccount = presentPassword => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        presentPassword
    );
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.delete();
        alert('Account deleted successfully');
    })
    .catch(error => alert(error.message))
};

export const convertUsersSnapshotToMap = users => {
    const transformedUsers = users.docs.map(doc => {
        const {displayName, avatar, followers, following} = doc.data();
        return {
            routeName: encodeURI(displayName.toLowerCase()),
            id: doc.id,
            displayName,
            avatar,
            followers,
            following
        };
    });
    return transformedUsers.reduce((accumulator, user) => {
        accumulator[user.displayName] = user;
        return accumulator;
    }, {});
};

export const convertPostsSnapshotToArray = posts => {
    if(!posts) return [];
    const transformedPosts = posts.docs.map(doc => {
        const {uploadedBy, message, image, likes, comments, createdAt} = doc.data();
        return {
            id: doc.id,
            uploadedBy,
            message,
            image,
            likes,
            comments,
            createdAt
        };
    });
    return transformedPosts;
};

export const createPost = async (postMessage, currentUser, imageUrl) => {
    const postRef = firestore.collection('posts').doc();
    const uploadedBy = currentUser;
    const message = postMessage;
    const image = imageUrl;
    const likes = [];
    const comments = [];
    const createdAt = new Date();
    try {
        await postRef.set({
            uploadedBy,
            message,
            image,
            likes,
            comments,
            createdAt
        });
    } catch(error) {
        console.log(error);
    }
};

export default firebase;