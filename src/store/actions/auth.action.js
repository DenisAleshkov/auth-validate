import firebase from "firebase";
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "./../constants";

export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signUpError = (payload) => ({ type: SIGNUP_ERROR, payload });

export const signUp = (credentials) => (dispatch) => {
  const { email, password, confirmPassword } = credentials;
  const db = firebase.firestore().collection("users");
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      db.doc(res.user.uid).set({
        email,
        password,
      });
      dispatch(signUpSuccess({ email, password, confirmPassword }));
    })
    .catch((error) => {
      dispatch(signUpError({registerError: error.message}));
    });
};
