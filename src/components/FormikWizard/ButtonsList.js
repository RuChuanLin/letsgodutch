import React, { Children } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px;
`;

const ButtonsList = ({
  activeStepIndex,
  totalSteps,
  onPreviousStep,
  onNextStep,
  onSubmit,
  children,
  validators,
}) => (
  <Wrapper>
    {Children.map(children, (child) => {
      const validator = validators[activeStepIndex];
      if (child.type.displayName === "PreviousButton") {
        return (
          <Button
            type="link"
            show={activeStepIndex > 0}
            onClick={onPreviousStep}
            label="Previous"
            {...child.props}
          />
        );
      }
      if (child.type.displayName === "NextButton") {
        return (
          <Button
            type="primary"
            show={activeStepIndex < totalSteps}
            onClick={onNextStep}
            validator={validator}
            label="Next"
            {...child.props}
          />
        );
      }
      if (child.type.displayName === "SubmitButton") {
        return (
          <Button
            show={activeStepIndex === totalSteps}
            onClick={onSubmit}
            validator={validator}
            type="submit"
            label="Finish"
            {...child.props}
          />
        );
      }
      return child;
    })}
  </Wrapper>
);

ButtonsList.propTypes = {
  activeStepIndex: PropTypes.number,
  totalSteps: PropTypes.number,
  onPreviousStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onSubmit: PropTypes.func,
  validators: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ButtonsList.displayName = "ButtonsList";

export default ButtonsList;
