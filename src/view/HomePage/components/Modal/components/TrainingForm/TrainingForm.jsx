import React from "react";

const TrainingForm = ({
  showFormClassName,
  handleSubmit,
  handleChange,
  hasInputTime,
  closeForm,
}) => {
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
            />
          </div>
          <div className="training-form_field">
            <input
              className="training-form_input"
              onChange={handleChange}
              id="to"
              placeholder="to"
              type="text"
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
      </form>
    </div>
  );
};

export default TrainingForm;
