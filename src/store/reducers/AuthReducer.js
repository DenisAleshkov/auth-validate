import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
} from "./../constants";

const initialState = {
  isAuth: true,
  userId: "",
  email: "",
  password: "",
  confirmPassword: "",
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
        confirmPassword: action.payload.confirmPassword
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
    default: {
      return state;
    }
  }
};

export default AuthReducer;
