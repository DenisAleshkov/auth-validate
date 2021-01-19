import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTraining } from "./../../../../store/actions/training.action";
import "./Modal.scss";

const Modal = (props) => {
  const [form, setForm] = useState(false);
  const [inputs, setInputs] = useState({
    from: "",
    to: "",
    date: "",
  });
  const dispatch = useDispatch();
  const showModalClassName = props.show ? "modal-show" : "modal-hide";
  const renderForm = () => {
    return (
      form && (
        <div className="actions-group">
          <form onSubmit={handleSubmit} className="form">
            <input
              onChange={handleChange}
              id="from"
              placeholder="from"
              type="text"
            />
            <input
              onChange={handleChange}
              id="to"
              placeholder="to"
              type="text"
            />
            <button onClick={handleSubmit}>send</button>
            <button onClick={closeForm}>&#10006;</button>
          </form>
        </div>
      )
    );
  };
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
      date: props.selected.toString(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTraining(props.trainerID, inputs));
  };
  const showFrom = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };
  const showContent = () => {
    return (
      <div className="modal-box">
        <h2>{props.selected.toString()}</h2>
        <div className="content">{props.children}</div>
        <div className="actions">
          {renderForm()}
          <div className="actions-group">
            <button className="add-button" onClick={showFrom}>
              +
            </button>
          </div>
          <div className="actions-group">
            <button className="close-button" onClick={props.close}>
              close
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <div className={`modal ${showModalClassName}`}>{showContent()}</div>;
};

export default Modal;
