import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
} from "./../constants";

export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signInSuccess = (payload) => ({ type: SIGNIN_SUCCESS, payload });


