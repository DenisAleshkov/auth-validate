import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  CLEAR_SIGNUP_MESSAGE,
} from "./../constants";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
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
    default: {
      return state;
    }
  }
};

export default AuthReducer;
