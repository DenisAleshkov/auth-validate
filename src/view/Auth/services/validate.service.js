const EmailValid = {
  validate: function (inputs) {
    if (!/^[A-Z0-9_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
      return "Invalid email address";
    }
  },
};

const PasswordOnDigit = {
  isDigit: /[0-9]/,
  validate: function (inputs) {
    if (!inputs.password.match(this.isDigit)) {
      return "password should contain one digit";
    }
  },
};

const PasswordOnLetter = {
  isUppercase: /[A-Z]/,
  validate: function (inputs) {
    if (!inputs.password.match(this.isUppercase)) {
      return "password should contain one uppercase letter";
    }
  },
};

const PasswordMatch = {
  validate: function (inputs) {
    if (inputs.password.length && inputs.password !== inputs.confirmPassword) {
      return "passwords do not match";
    }
  },
};

export const VALIDATORS_PASSWORD = [
  PasswordOnDigit,
  PasswordOnLetter,
  PasswordMatch,
];

export const VALIDATORS_EMAIL = [EmailValid];

export const isValidateField = (VALIDATORS, inputs) => {
  const errors = [];
  VALIDATORS.forEach((validator) => {
    const error = validator.validate(inputs);
    if (error) {
      errors.push(error);
    }
  });
  return errors;
};
