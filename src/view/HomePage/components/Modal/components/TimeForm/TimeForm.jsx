import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTraining } from "./../../../../../../store/actions/training.action";
import {
  isValidateField,
  VALIDATORS_TIME,
} from "./../../services/validate.service";
const TimeForm = ({ closeForm, form, selected, trainerID }) => {
  console.log("TimeForm");
  const [validateError, setValidateError] = useState([]);
  const [inputs, setInputs] = useState({
    from: "",
    to: "",
    date: "",
    email: "",
  });

  const showFormClassName = form ? "form-show" : "form-hide";

  const dispatch = useDispatch();

  const email = useSelector((state) => state.AuthReducer.email);

  
  useEffect(() => {
    setInputs({
      from: "",
      to: "",
      date: "",
      email: "",
    });
  }, [form]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
      date: selected.toString(),
      email: email,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = isValidateField(VALIDATORS_TIME, {
      from: inputs.from,
      to: inputs.to,
    });
    const isError = [...errors].length;
    if (isError) {
      setValidateError(errors);
    } else {
      setValidateError([]);
      dispatch(addTraining(trainerID, inputs));
      setInputs({
        from: "",
        to: "",
        date: "",
        email: "",
      });
    }
  };

  const hasInputTime = () => {
    const { from, to } = inputs;
    return from === "" || to === "";
  };

  const renderError = () =>
    validateError.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  return (
    <div className={`form-container ${showFormClassName}`}>
      <form onSubmit={handleSubmit} className="training-form">
        <div className="training-form_body">
          <div className="training-form_field">
            <input
              className="training-form_input"
              onChange={handleChange}
              id="from"
              placeholder="from"
              type="input"
              value={inputs.from}
            />
          </div>
          <div className="training-form_field">
            <input
              className="training-form_input"
              onChange={handleChange}
              id="to"
              placeholder="to"
              type="text"
              value={inputs.to}
            />
          </div>
          <div className="training-form_field">
            <button
              className="training-form_btn btn-send"
              onClick={handleSubmit}
              disabled={hasInputTime()}
            >
              send
            </button>
          </div>
          <div className="training-form_field">
            <button className="training-form_btn btn-close" onClick={closeForm}>
              &#10006;
            </button>
          </div>
        </div>
        <div className={validateError.length && "info info-time-error"}>{renderError()}</div>
      </form>
    </div>
  );
};

export default TimeForm;
