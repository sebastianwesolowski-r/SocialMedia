import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

import config from './config';

firebase.initializeApp(config);

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

export default firebase;