import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "./../../store/actions/auth.action";
import "./SignIn.scss";

const SignIn = () => {
  const [validateError, setValidateError] = React.useState({});
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const authError = useSelector((state) => state.AuthReducer.authError);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setValidateError(authError);
  }, [authError]);

  React.useEffect(() => {
    return () => {
      setValidateError({});
    };
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorFieldPassword = isValidateField(VALIDATORS_PASSWORD);
    const errorFieldEmail = isValidateField(VALIDATORS_EMAIL);
    const noErrors =
      Object.keys({
        ...errorFieldPassword,
        ...errorFieldEmail,
      }).length === 0;
    if (noErrors) {
      dispatch(signIn(inputs));
    } else {
      setValidateError({
        passwordError: errorFieldPassword,
        emailError: errorFieldEmail,
      });
    }
  };

  const isValidateField = (VALIDATORS) => {
    const errors = {};
    VALIDATORS.forEach((validator) => {
      const error = validator.validate();
      if (error !== undefined) {
        const key = Object.keys(error);
        const value = Object.values(error)[0];
        errors[key] = value;
      }
    });
    return errors;
  };

  const EmailExist = {
    validate: function () {
      if (!inputs.email) {
        return {
          emailError: "Check Email",
        };
      }
    },
  };

  const EmailValid = {
    validate: function () {
      if (!/^[A-Z0-9_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
        return {
          emailValidError: "Invalid email address",
        };
      }
    },
  };

  const PasswordExist = {
    validate: function () {
      if (!inputs.password) {
        return {
          passwordError: "check password",
        };
      }
    },
  };

  const VALIDATORS_PASSWORD = [PasswordExist];

  const VALIDATORS_EMAIL = [EmailExist, EmailValid];

  const showPasswordErrors = () => {
    if (validateError.passwordError) {
      return Object.values(validateError.passwordError).map((item) => (
        <span key={item} className="error">
          {item}
        </span>
      ));
    }
  };
  const showEmailErrors = () => {
    if (validateError.emailError) {
      return Object.values(validateError.emailError).map((item) => (
        <span key={item} className="error">
          {item}
        </span>
      ));
    }
  };
  const showAuthErrors = () => {
    return (
      validateError.authError && (
        <span className="error">{validateError.authError}</span>
      )
    );
  };

  return (
    <div className="wrapper">
      <div className="wrapper-form">
        <div className="title">
          <h2 className="title-text">Login</h2>
        </div>
        <form className="sign-form" onSubmit={handleSubmit} >
          <div className="sign-form_group">
            <input
              type="text"
              name="email"
              id="email"
              className="sign-form_input"
              onChange={handleChange}
              required
            />
            <label className="sign-form_label" htmlFor="email">
              Email
            </label>
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
          </div>
          <div className="sign-form_group">
            <button className="sign-form_button" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="sign-form_group">
            <Link className="sign-form_link" to="/signUp">
              Don`t have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
