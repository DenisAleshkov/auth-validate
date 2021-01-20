import React, { useEffect, useState } from "react";
import moment from "moment";
import Record from "./components/Record/Record";
import TrainingForm from "./components/TrainingForm/TrainingForm";
import { VALIDATORS_TIME, isValidateField } from "./services/validate.service";
import { useDispatch, useSelector } from "react-redux";
import { addTraining } from "./../../../../store/actions/training.action";
import "./Modal.scss";

const Modal = (props) => {
  const [validateError, setValidateError] = useState([]);
  const [form, setForm] = useState(false);
  const [inputs, setInputs] = useState({
    from: "",
    to: "",
    date: "",
    email: "",
  });

  const dispatch = useDispatch();

  const training = useSelector((state) => state.TrainingReducer.training);
  const email = useSelector((state) => state.AuthReducer.email);

  const showModalClassName = props.show ? "modal-show" : "modal-hide";
  const showFormClassName = form ? "form-show" : "form-hide";
  const showBtnClassName = form ? "btn-hide" : "btn-show";

  const hasInputTime = () => {
    const { from, to } = inputs;
    return from === "" || to === "";
  };

  const renderForm = () =>
    form && (
      <TrainingForm
        showFormClassName={showFormClassName}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        hasInputTime={hasInputTime}
        closeForm={closeForm}
      />
    );

  useEffect(() => {
    setForm(false);
    setInputs({
      from: "",
      to: "",
      date: "",
      email: "",
    });
  }, [props.show]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
      date: props.selected.toString(),
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
      dispatch(addTraining(props.trainerID, inputs));
    }
  };

  const showForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
    setInputs({
      from: "",
      to: "",
      date: "",
      email: "",
    });
    setValidateError([]);
  };

  const renderTraining = () => {
    const haveTraining = training.filter((item) =>
      props.selected.isSame(item.date, "day")
    );
    if (haveTraining.length) {
      return haveTraining.map((item, index) => (
        <Record
          key={item.id}
          index={index}
          email={item.email}
          from={
            item.from.length <= 2
              ? moment(`${item.from}`, "H").format("HH:mm")
              : item.from
          }
          to={
            item.to.length <= 2
              ? moment(`${item.to}`, "H").format("HH:mm")
              : item.to
          }
        />
      ));
    }
    return <div className="empty-record">No record</div>;
  };

  const renderError = () =>
    validateError.map((item) => (
      <span key={item} className="error">
        {item}
      </span>
    ));

  return (
    <div className={`modal ${showModalClassName}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{props.selected.format("MMMM Do YYYY")}</h2>
          <div className="modal-close">
            <button className="close-button" onClick={props.close}>
              &#10006;
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div class="record">{renderTraining()}</div>
          </div>
        </div>
        <div className="modal-action">
          <div className={`${showFormClassName} actions-group_create_form`}>
            {renderForm()}
          </div>
          <div className={`${showBtnClassName} actions-group`}>
            <button
              className={`${showBtnClassName} add-button`}
              onClick={showForm}
            >
              +
            </button>
          </div>
          <div className={validateError.length && "info"}>{renderError()}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
