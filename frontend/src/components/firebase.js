import firebase from "firebase/compat/app"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider()

const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider)
        const user = res.user
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get()
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
    } catch (e) {
        console.log(e.message)
      }
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
        console.log(e.message)
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        const user = res.user
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (e) {
        console.log(e.message)
    }
}

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email)
        alert("Password reset link sent.")
    } catch (e) {
        console.log(e.message)
    }
}

const logout = () => {
    auth.signOut()
}

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
 }