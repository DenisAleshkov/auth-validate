import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SET_USER,
} from "./../constants";

const initialState = {
  isAuth: false,
  userId: "",
  email: "",
  password: "",
  confirmPassword: "",
  signOutError: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.userId,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.userId,
        email: action.payload.email,
        password: action.payload.password,
      };
    }
    case SET_USER: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.userId,
        email: action.payload.email,
        password: action.payload.password,
      };
    }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    }
    case SIGNOUT_ERROR: {
      return {
        ...state,
        signOutError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
