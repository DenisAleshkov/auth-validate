import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  signUp,
  clearRegisterError,
  clearRegisterMessage,
} from "./../../store/actions/auth.action";
import "./SignUp.scss";

const SignUp = () => {
  const [validateError, setValidateError] = React.useState({});
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerError = useSelector((state) => state.AuthReducer.registerError);
  const registerMessage = useSelector(
    (state) => state.AuthReducer.registerMessage
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(clearRegisterMessage());
    setValidateError(registerError);
  }, [registerError]);

  React.useEffect(() => {
    return () => {
      dispatch(clearRegisterMessage());
      dispatch(clearRegisterError());
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
      dispatch(clearRegisterError());
      setValidateError({});
      dispatch(signUp(inputs));
    } else {
      dispatch(clearRegisterMessage());
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

  const PasswordLength = {
    validate: function () {
      if (!inputs.password || inputs.password.length < 8) {
        return {
          passwordError: "check password",
        };
      }
    },
  };

  const PasswordOnDigit = {
    isDigit: /[0-9]/,
    validate: function () {
      if (!inputs.password.match(this.isDigit)) {
        return {
          digitError: "password should contain one digit",
        };
      }
    },
  };

  const PasswordOnLetter = {
    isUppercase: /[A-Z]/,
    validate: function () {
      if (!inputs.password.match(this.isUppercase)) {
        return {
          letterError: "password should contain one uppercase letter",
        };
      }
    },
  };

  const PasswordMatch = {
    validate: function () {
      if (
        inputs.password.length &&
        inputs.password !== inputs.confirmPassword
      ) {
        return {
          matchError: "passwords do not match",
        };
      }
    },
  };

  const VALIDATORS_PASSWORD = [
    PasswordLength,
    PasswordOnDigit,
    PasswordOnLetter,
    PasswordMatch,
  ];

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
  const showRegisterErrors = () => {
    return (
      validateError.registerError && (
        <span className="error">{validateError.registerError}</span>
      )
    );
  };
  const showMessage = () => {
    return (
      registerMessage && <span className="message">{registerMessage}</span>
    );
  };
  
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${validateError.emailError && "error-input"}`}
              onChange={handleChange}
              noValidate
            />
          </div>
          <div className="info">{showEmailErrors()}</div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={`${validateError.passwordError && "error-input"}`}
              onChange={handleChange}
              noValidate
            />
          </div>
          <div className="password">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              className={`${
                validateError.passwordError?.matchError && "error-input"
              }`}
              onChange={handleChange}
              noValidate
            />
          </div>
          <div className="info">
            {showPasswordErrors()}
            {showMessage()}
            {showRegisterErrors()}
          </div>
          <div className="submit">
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div>
            <Link to="/signIn">do not have account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
