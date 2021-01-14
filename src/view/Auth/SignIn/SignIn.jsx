import React from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signInSuccess } from "./../../../store/actions/auth.action";
import {
  VALIDATORS_EMAIL,
  isValidateField,
} from "./../services/validate.service";
import "./../Auth.scss";

const SignIn = () => {
  const [validateError, setValidateError] = React.useState({
    errorEmail: [],
    errorLogin: [],
  });
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signIn = (credentials) => {
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
        setValidateError({
          errorEmail: [],
          errorLogin: [error.message],
        });
      });
  };

  const hasInputsValue = () => {
    const { email, password } = inputs;
    return email === "" || password === "";
  };

  React.useEffect(() => {
    return () => {
      setValidateError({
        errorEmail: [],
        errorLogin: [],
      });
    };
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorFieldEmail = isValidateField(VALIDATORS_EMAIL, inputs);
    const isErrors = [...errorFieldEmail].length;
    if (isErrors) {
      setValidateError({
        errorEmail: [...errorFieldEmail],
        errorLogin: [],
      });
    } else {
      setValidateError({
        errorEmail: [],
        errorLogin: [],
      });
      signIn(inputs);
    }
  };

  const renderEmailErrors = () =>
    validateError.errorEmail.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  const renderLoginErrors = () =>
    validateError.errorLogin.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  return (
    <div className="wrapper">
      <div className="wrapper-form">
        <div className="title">
          <h2 className="title-text">Login</h2>
        </div>
        <form className="sign-form" onSubmit={handleSubmit}>
          <div className="sign-form_group">
            <input
              type="text"
              name="email"
              id="email"
              className={`${
                validateError.errorEmail.length && "sign-form_input_error"
              } 
                  sign-form_input
              `}
              onChange={handleChange}
              required
            />
            <label className="sign-form_label" htmlFor="email">
              Email
            </label>
            <div className={validateError.errorEmail.length && "info"}>
              {renderEmailErrors()}
            </div>
          </div>

          <div className="sign-form_group">
            <input
              type="password"
              name="password"
              id="password"
              className="sign-form_input"
              onChange={handleChange}
              required
            />
            <label className="sign-form_label" htmlFor="password">
              Password
            </label>
            <div className={validateError.errorLogin.length && "info"}>
              {renderLoginErrors()}
            </div>
          </div>
          <div className="sign-form_group">
            <button
              className="sign-form_button"
              onClick={handleSubmit}
              disabled={hasInputsValue()}
            >
              Login
            </button>
          </div>
          <div className="sign-form_group">
            <Link className="sign-form_link" to="/signUp">
              Don`t have an accaunt?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
