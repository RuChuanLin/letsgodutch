import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  button {
    margin-left: 12px;
  }
`;

const WizardPanel = ({
  currentStepIndex,
  totalSteps,
  getStepControl,
  validation,
  prevText = "Go Back",
  nextText = "Continue",
  FinishText = "Finish",
}) => {
  //   const firstStep = () => getStepControl().goto(0);
  //   const lastStep = () => getStepControl().goto(totalSteps - 1);
  return (
    <Wrapper>
      {currentStepIndex > 0 && (
        <Button onClick={() => getStepControl().prev()}>{prevText}</Button>
      )}
      {
        <Button
        disabled={!validation}
        type="primary" onClick={() => getStepControl().next()}>
          {currentStepIndex < totalSteps - 1 ? nextText : FinishText}
        </Button>
      }
    </Wrapper>
  );
};

export default WizardPanel;
