const WORK_AT = 9;
const WORK_UNTIL = 22;
const NIGHT_TIME = 0;

const TimeValid = {
  validString: /^([2][0-3]|[01]?[0-9])([.:][0-5][0-9])?$/,
  validate: function (inputs) {
    if (
      !this.validString.test(inputs.from) ||
      !this.validString.test(inputs.to)
    ) {
      return "Invalid time";
    }
  },
};

const isTimeValid = {
  isValidate: function (inputs) {
    return TimeValid.validate(inputs);
  },
};

const Work = {
  isWorkUntil: function (value) {
    if ((value <= WORK_AT && value >= NIGHT_TIME) || value > WORK_UNTIL) {
      return true;
    }
    return false;
  },
  isWorkAt: function (value) {
    if (value < WORK_AT) {
      return true;
    }
    return false;
  },
};

const fromHoursToNumber = (time) => {
  const hoursMinutes = time.split(/[.:]/);
  const hours = parseInt(hoursMinutes[0], 10);
  const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
};

const TimeOnWork = {
  validate: function (inputs) {
    const isWorkUntil = Work.isWorkUntil(fromHoursToNumber(inputs.to));
    const isWorkAt = Work.isWorkAt(fromHoursToNumber(inputs.from));
    const workSucces = [isWorkUntil, isWorkAt].every((item) => item === false);
    if (!isTimeValid.isValidate(inputs) && !workSucces) {
      return "We don`t work in this time";
    }
  },
};

const TimeOnInterval = {
  validate: function (inputs) {
    const FromHours = fromHoursToNumber(inputs.from);
    const ToHours = fromHoursToNumber(inputs.to);
    if (FromHours >= ToHours) {
      return "You can`t check this time";
    }
  },
};

export const VALIDATORS_TIME = [TimeValid, TimeOnWork, TimeOnInterval];

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
