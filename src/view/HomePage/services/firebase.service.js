import firebase from "firebase";

export const getCurrentUserFromFirebase = (callback) =>
  firebase.auth().onAuthStateChanged(callback);

export const getUserInfo = async (uid) =>
  await firebase.firestore().collection("users").doc(uid).get();
