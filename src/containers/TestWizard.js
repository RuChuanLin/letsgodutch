import React from "react";

import StepWizard from "react-step-wizard";
// const updateForm = (key, value) => {
//   const { form } = state;

//   form[key] = value;
//   updateState({
//     ...state,
//     form,
//   });
// };
const Test = () => {
  return (
    <>
      <StepWizard > 
          <First hashKey={"FirstStep"} /> 
          <First hashKey={"SecondStep"} /> 
          <First hashKey={"ThirdStep"} /> 
      </StepWizard>
    </>
  );
};

const First = (props) => {
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className="text-center">Welcome! Have a look around!</h3>

      <label>First Name</label>
      <input
        type="text"
        className="form-control"
        name="firstname"
        placeholder="First Name"
        onChange={update}
      />
      <Stats step={1} {...props} />
    </div>
  );
};
const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
}) => (
  <div>
    <hr />
    {step > 1 && (
      <button className="btn btn-default btn-block" onClick={previousStep}>
        Go Back
      </button>
    )}
    {step < totalSteps ? (
      <button className="btn btn-primary btn-block" onClick={nextStep}>
        Continue
      </button>
    ) : (
      <button className="btn btn-success btn-block" onClick={nextStep}>
        Finish
      </button>
    )}
    <hr />
    <div style={{ fontSize: "21px", fontWeight: "200" }}>
      <h4>Other Functions</h4>
      <div>Current Step: {currentStep}</div>
      <div>Total Steps: {totalSteps}</div>
      <button className="btn btn-block btn-default" onClick={firstStep}>
        First Step
      </button>
      <button className="btn btn-block btn-default" onClick={lastStep}>
        Last Step
      </button>
      <button className="btn btn-block btn-default" onClick={() => goToStep(2)}>
        Go to Step 2
      </button>
    </div>
  </div>
);
export default Test;
