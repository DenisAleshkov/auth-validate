import firebase from "firebase";

export const getTrainingCollectionFromFirebase = (id) =>
  firebase.firestore().collection("trainers").doc(id).collection("training");

export const signOutFromFirebase = () => firebase.auth().signOut();
