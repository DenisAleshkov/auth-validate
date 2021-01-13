import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  CLEAR_SIGNUP_MESSAGE,
  CLEAR_SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from "./../constants";

const initialState = {
  isAuth: false,
  userId: "",
  email: "",
  password: "",
  confirmPassword: "",
  authError: "",
  registerError: "",
  registerMessage: "",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
        registerMessage: action.payload.registerMessage,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        registerError: action.payload,
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
    case SIGNIN_ERROR: {
      return {
        ...state,
        authError: action.payload
      };
    }
    case CLEAR_SIGNUP_ERROR: {
      return {
        ...state,
        registerError: "",
      };
    }
    case CLEAR_SIGNUP_MESSAGE: {
      return {
        ...state,
        registerMessage: "",
      };
    }
    case CLEAR_SIGNIN_ERROR: {
      return {
        ...state,
        authError: ""
      }
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
