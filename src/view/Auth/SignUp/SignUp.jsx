import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUpSuccess } from "./../../../store/actions/auth.action";
import { signUpFromFirebase, setUser } from "./../services/auth.service";
import {
  VALIDATORS_PASSWORD,
  VALIDATORS_EMAIL,
  isValidateField,
} from "./../services/validate.service";
import "./../Auth.scss";

const SignUp = () => {
  const [redirect, setRedirect] = useState(false);
  const [validateError, setValidateError] = useState({
    errorEmail: [],
    errorPassword: [],
    errorRegister: [],
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const signUp = (credentials) => {
    const { email, password, confirmPassword } = credentials;
    signUpFromFirebase(credentials)
      .then((res) => {
        setUser(res.user.uid, {
          email,
          password,
        });
        dispatch(
          signUpSuccess({
            isAuth: true,
            userId: res.user.uid,
            email,
            password,
            confirmPassword,
          })
        );
        setRedirect(true);
      })
      .catch((error) => {
        setValidateError({
          errorEmail: [],
          errorPassword: [],
          errorRegister: [error.message],
        });
        setRedirect(false);
      });
  };

  const hasInputsValue = () => {
    const { email, password, confirmPassword } = inputs;
    return email === "" || password === "" || confirmPassword === "";
  };

  useEffect(() => {
    return () => {
      setValidateError({
        errorEmail: [],
        errorPassword: [],
        errorRegister: [],
      });
    };
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorFieldPassword = isValidateField(VALIDATORS_PASSWORD, inputs);
    const errorFieldEmail = isValidateField(VALIDATORS_EMAIL, inputs);
    const isErrors = [...errorFieldEmail, ...errorFieldPassword].length;
    if (isErrors) {
      setValidateError({
        errorEmail: [...errorFieldEmail],
        errorPassword: [...errorFieldPassword],
        errorRegister: [],
      });
    } else {
      setValidateError({
        errorEmail: [],
        errorPassword: [],
        errorRegister: [],
      });
      signUp(inputs);
    }
  };

  const renderPasswordErrors = () =>
    validateError.errorPassword.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  const renderEmailErrors = () =>
    validateError.errorEmail.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  const renderRegisterErrors = () =>
    validateError.errorRegister.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  if (redirect) return <Redirect to="/home" />;

  return (
    <div className="wrapper">
      <div className="wrapper-form">
        <div className="title">
          <h2 className="title-text">Register</h2>
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
              className={`${
                validateError.errorPassword.length && "sign-form_input_error"
              } 
                  sign-form_input
              `}
              onChange={handleChange}
              required
            />
            <label className="sign-form_label" htmlFor="password">
              Password
            </label>
          </div>
          <div className="sign-form_group">
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              className={`${
                validateError.errorPassword.length && "sign-form_input_error"
              } 
                  sign-form_input
              `}
              onChange={handleChange}
              required
            />
            <label className="sign-form_label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className={validateError.errorPassword.length && "info"}>
              {renderPasswordErrors()}
            </div>
            <div className={validateError.errorRegister.length && "info"}>
              {renderRegisterErrors()}
            </div>
          </div>
          <div className="sign-form_group">
            <button
              className="sign-form_button"
              onClick={handleSubmit}
              disabled={hasInputsValue()}
            >
              Register
            </button>
          </div>
          <div className="sign-form_group">
            <Link className="sign-form_link" to="/signIn">
              Already have an accaunt?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
