import React, { Children, cloneElement, useState } from "react";
import PropTypes from "prop-types";
// import StepTabs from "./StepTabs";
import { produce } from "immer";

const getTotalSteps = (children) => {
  const reactChildren = React.Children.toArray(children);
  for (const child of reactChildren) {
    if (child.type.displayName === "StepsList") {
      return child.props.children.length - 1;
    }
  }
  throw new Error("Require StepsList");
};

const Wizard = ({ children, onSubmit, ...props }) => {
  debugger;
  const [state, setState] = useState({
    activeStepIndex: 0,
    totalSteps: getTotalSteps(children),
    stepTabs: [],
    direction: 0,
  });

  const onPreviousStep = () =>
    setState(
      produce(state, (draftState) => {
        draftState.activeStepIndex = state.activeStepIndex - 1;
        draftState.direction = -1;
      })
    );

  const onNextStep = () =>
    setState(
      produce(state, (draftState) => {
        draftState.activeStepIndex = state.activeStepIndex + 1;
        draftState.direction = 1;
      })
    );

  const submitHandler = onSubmit
    ? () => {
        onSubmit(props.values);
        props.setIsModalVisible(false);
        props.setValues(props.initialValues);
        setState(
          produce(state, (draft) => {
            draft.activeStepIndex = 0;
            draft.direction = 0;
          })
        );
      }
    : () => console.log("submitted the form");

  const updateStepTabs = (stepTabs) =>
    setState(
      produce(state, (draftState) => {
        draftState.stepTabs = stepTabs;
      })
    );

  const getInitialComponents = () => {
    let stepsComponent = null;
    let buttonsListComponent = null;
    let validators = [];

    Children.forEach(children, (child) => {
      if (child.type.displayName === "StepsList") {
        stepsComponent = cloneElement(child, {
          activeStepIndex: state.activeStepIndex,
          updateStepTabs: updateStepTabs,
          direction: state.direction,
          ...props,
        });
        if (child.props.validators) {
          // eslint-disable-next-line prefer-destructuring
          validators = child.props.validators;
        }
      }
      if (child.type.displayName === "ButtonsList") {
        buttonsListComponent = cloneElement(child, {
          activeStepIndex: state.activeStepIndex,
          totalSteps: state.totalSteps,
          submitHandler,

          onNextStep,
          onPreviousStep,
          validators,
          ...props,
        });
      }
    });
    return { stepsComponent, buttonsListComponent };
  };

  const { stepsComponent, buttonsListComponent } = getInitialComponents();

  return (
    <div>
      {/* <StepTabs tabs={state.stepTabs} activeStepIndex={state.activeStepIndex} /> */}
      {stepsComponent}
      {buttonsListComponent}
    </div>
  );
};

Wizard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Wizard.displayName = "Wizard";

export default Wizard;
