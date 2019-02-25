import firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyD4_6rhbiRsvPVrlJPsQ9aQpF2N_0rE0Bg",
    databaseURL: "https://tac-fb.firebaseio.com",
};

const devConfig = {
    apiKey: "AIzaSyD4_6rhbiRsvPVrlJPsQ9aQpF2N_0rE0Bg",
    databaseURL: "https://tac-fb.firebaseio.com",
};

const config = process.env.NODE_ENV === 'production' ? prodConfig: devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();


const databaseRef = firebaseDatabase.ref();
export const postsRef = databaseRef.child("posts").orderByKey();