import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "./../../store/actions/auth.action";
import "./SignUp.scss";

const SignUp = () => {
  const [validateError, setValidateError] = React.useState({});
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerError = useSelector((state) => state.AuthReducer.registerError);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorField = isValidateField();
    const noErrors =
      Object.keys({ ...errorField, ...registerError }).length === 0;
    if (noErrors) {
      setValidateError({});
      dispatch(signUp(inputs));
    } else {
      setValidateError({ ...errorField, ...registerError });
    }
  };

  const isValidateField = () => {
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

  const VALIDATORS = [
    PasswordLength,
    PasswordOnDigit,
    PasswordOnLetter,
    PasswordMatch,
    EmailExist,
    EmailValid,
  ];

  const showErrors = () =>
    Object.values(validateError).map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

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
              onChange={handleChange}
              noValidate
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
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
              onChange={handleChange}
              noValidate
            />
          </div>
          <div className="info">{showErrors()}</div>
          <div className="submit">
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div>
            <Link to="/signIn">already have account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
