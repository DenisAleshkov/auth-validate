import firebase from "firebase";

import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from "./../constants";

export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signUpError = (payload) => ({ type: SIGNUP_ERROR, payload });
export const signInSuccess = (payload) => ({ type: SIGNIN_SUCCESS, payload });
export const signInError = (payload) => ({ type: SIGNIN_ERROR, payload });

export const signIn = (credentials) => (dispatch) => {
  const { email, password } = credentials;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      dispatch(
        signInSuccess({
          isAuth: true,
          userId: res.user.uid,
          email,
          password,
        })
      );
    })
    .catch((error) => {
      dispatch(signInError({ authError: error.message }));
    });
};
