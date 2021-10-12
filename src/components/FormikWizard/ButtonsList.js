import React, { Children } from "react";

import { RocketOutlined } from "@ant-design/icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ButtonsList = ({
  activeStepIndex,
  totalSteps,
  onPreviousStep,
  onNextStep,
  onSubmit,
  children,
  validators,
  ...formik
}) => {
  return (
    <Wrapper>
      {Children.map(children, (child) => {
        const validator = validators[activeStepIndex];
        if (child.type.displayName === "PreviousButton") {
          return (
            <Button
              type="link"
              show={activeStepIndex > 0}
              onClick={onPreviousStep}
              label="上一步"
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
              label="下一步"
              {...child.props}
            />
          );
        }
        if (child.type.displayName === "SubmitButton") {
          return (
            <Button
              show={activeStepIndex === totalSteps}
              onClick={formik.submitHandler}
              validator={validator}
              type="primary"
              label={
                <span>
                  <RocketOutlined /> 送出
                </span>
              }
              {...child.props}
            />
          );
        }
        return child;
      })}
    </Wrapper>
  );
};

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
