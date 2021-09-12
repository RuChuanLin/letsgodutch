const WizardPanel = ({ currentStepIndex, totalSteps, getStepControl }) => {
  //   const firstStep = () => getStepControl().goto(0);
  //   const lastStep = () => getStepControl().goto(totalSteps - 1);

  return (
    <div>
      {currentStepIndex > 0 && (
        <button
          className="btn btn-default btn-block"
          onClick={() => getStepControl().prev()}
        >
          Go Back
        </button>
      )}
      {currentStepIndex < totalSteps - 1 ? (
        <button
          className="btn btn-primary btn-block"
          onClick={() => getStepControl().next()}
        >
          Continue
        </button>
      ) : (
        <button
          className="btn btn-success btn-block"
          onClick={() => getStepControl().next()}
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default WizardPanel;
