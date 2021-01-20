import { SIGNUP_SUCCESS, SIGNIN_SUCCESS, SET_USER } from "./../constants";

export const setUser = (payload) => ({ type: SET_USER, payload });
export const signUpSuccess = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signInSuccess = (payload) => ({ type: SIGNIN_SUCCESS, payload });
