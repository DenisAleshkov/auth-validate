import firebase from "firebase";

export const setUser = (uid, credentials) => {
  const db = firebase.firestore().collection("users");
  db.doc(uid).set(credentials);
};

export const signInFromFirebase = (credentials) => {
  const { email, password } = credentials;
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUpFromFirebase = (credentials) => {
  const { email, password } = credentials;
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
