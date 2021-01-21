import React, { useEffect, useState } from "react";
import moment from "moment";
import Record from "./components/Record/Record";
import TimeForm from "./components/TimeForm/TimeForm";
import { useSelector } from "react-redux";
import "./Modal.scss";

const Modal = ({ show, close, selected, trainerID }) => {
  
  const [form, setForm] = useState(false);
  
  const training = useSelector((state) => state.TrainingReducer.training);
  
  const showModalClassName = show ? "modal-show" : "modal-hide";
  const showFormClassName = form ? "form-show" : "form-hide";
  const showBtnClassName = form ? "btn-hide" : "btn-show";

  const renderForm = () =>
    form && (
      <TimeForm
        selected={selected}
        showFormClassName={showFormClassName}
        closeForm={closeForm}
        form={form}
        trainerID={trainerID}
      />
    );

  useEffect(() => {
    setForm(false);
  }, [show]);
  
  const showForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
  };

  const renderTraining = () => {
    const haveTraining = training.filter((item) =>
      selected.isSame(item.date, "day")
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
  }

 

  return (
    <div className={`modal ${showModalClassName}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{selected.format("MMMM Do YYYY")}</h2>
          <div className="modal-close">
            <button className="close-button" onClick={close}>
              &#10006;
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div class="record">{show && renderTraining()}</div>
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
