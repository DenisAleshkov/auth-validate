import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SET_USER,
} from "./../constants";
import { signOutFromFirebase } from "./../services/firebase.service";

export const setUser = (payload) => ({ type: SET_USER, payload });
export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signInSuccess = (payload) => ({ type: SIGNIN_SUCCESS, payload });
export const signOutSuccess = (payload) => ({ type: SIGNOUT_SUCCESS, payload });
export const signOutError = (payload) => ({ type: SIGNOUT_ERROR, payload });

export const signOut = (history) => (dispatch) => {
  signOutFromFirebase()
    .then(() => {
      dispatch(signOutSuccess({ isAuth: false }));
      history.push("/signIn");
    })
    .catch((error) => {
      dispatch(signOutError(error.response));
    });
};
