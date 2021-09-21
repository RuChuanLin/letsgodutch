import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

const LeftWrapper = styled.div``;
const RightWrapper = styled.div`
  button {
    margin-left: 12px;
  }
`;

const WizardPanel = ({
  SW,
  activeStep,
  errorMsgs,
  prevText = "Go Back",
  nextText = "Continue",
  FinishText = "Finish",
  ExtraPanelInfo,
}) => {
  const { totalSteps } = SW;
  
  return (
    <Wrapper>
      <LeftWrapper>
        {ExtraPanelInfo ? <ExtraPanelInfo></ExtraPanelInfo> : <></>}
      </LeftWrapper>
      <RightWrapper>
        {activeStep > 0 && (
          <Button onClick={SW.previousStep}>{prevText}</Button>
        )}
        {
          <Button
            disabled={errorMsgs.length > 0}
            type="primary"
            onClick={SW.nextStep}
          >
            {activeStep < totalSteps - 1 ? nextText : FinishText}
          </Button>
        }
      </RightWrapper>
    </Wrapper>
  );
};

export default WizardPanel;
