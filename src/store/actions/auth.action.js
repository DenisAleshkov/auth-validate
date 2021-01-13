import firebase from "firebase";

import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  CLEAR_SIGNUP_MESSAGE,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  CLEAR_SIGNIN_ERROR,
} from "./../constants";

export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signUpError = (payload) => ({ type: SIGNUP_ERROR, payload });
export const signInSuccess = (payload) => ({ type: SIGNIN_SUCCESS, payload });
export const signInError = (payload) => ({ type: SIGNIN_ERROR, payload });
export const clearRegisterError = () => ({ type: CLEAR_SIGNUP_ERROR });
export const clearRegisterMessage = () => ({ type: CLEAR_SIGNUP_MESSAGE });
export const clearAuthError = () => ({ type: CLEAR_SIGNIN_ERROR });

export const getUserInfo = async (id) => {
  const userData = await firebase.firestore().collection("users").doc(id).get();
  const user = { ...userData.data(), id: userData.id };
  return user;
};

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

export const signIn = (credentials) => (dispatch) => {
  const { email, password } = credentials;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      const user = await getUserInfo(res.user.uid);
      dispatch(
        signInSuccess({
          isAuth: true,
          userId: res.user.uid,
          email: user.email,
          password,
        })
      );
    })
    .catch((error) => {
      dispatch(signInError({ authError: error.message }));
    });
};
