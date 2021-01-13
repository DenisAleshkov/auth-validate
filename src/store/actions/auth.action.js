import firebase from "firebase";
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  CLEAR_SIGNUP_MESSAGE
} from "./../constants";

export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signUpError = (payload) => ({ type: SIGNUP_ERROR, payload });
export const clearError = () => ({ type: CLEAR_SIGNUP_ERROR });
export const clearMessage = () => ({ type: CLEAR_SIGNUP_MESSAGE });

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
      dispatch(
        signUpSuccess({
          email,
          password,
          confirmPassword,
          registerMessage: "You are register",
        })
      );
    })
    .catch((error) => {
      dispatch(signUpError({ registerError: error.message }));
    });
};
