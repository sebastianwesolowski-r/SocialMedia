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
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfile = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        const followers = [];
        const following = [];
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                followers,
                following,
                ...additionalData
            });
        } catch(error) {
            alert('There was a problem: ', error.message);
        }
    }
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export const convertUsersSnapshotToMap = users => {
    const transformedUsers = users.docs.map(doc => {
        const {displayName, followers, following} = doc.data();
        return {
            routeName: encodeURI(displayName.toLowerCase()),
            id: doc.id,
            displayName,
            followers,
            following
        };
    });
    return transformedUsers.reduce((accumulator, user) => {
        accumulator[user.displayName] = user;
        return accumulator;
    }, {});
};

export const convertPostsSnapshotToMap = posts => {
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
    return transformedPosts.reduce((accumulator, post) => {
        accumulator[post.id] = post;
        return accumulator;
    }, {});
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