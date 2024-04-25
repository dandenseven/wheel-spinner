import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const config = {
    apiKey: "APIKEY",
    authDomain: "my-finalproject-2b552.firebaseapp.com",
    databaseURL: "https://my-finalproject-2b552-default-rtdb.firebaseio.com/",
    projectId: "my-finalproject-2b552",
    storageBucket: "my-finalproject-2b552.appspot.com",
    messagingSenderId: "MESS_ID",
};

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.firestore();
    }


    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.currentUser.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

}

export default Firebase;
