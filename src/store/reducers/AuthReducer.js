import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "./../constants";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  registerError: ""
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        registerError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
