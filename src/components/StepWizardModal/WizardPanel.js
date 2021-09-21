import { useState } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

const LeftWrapper = styled.div``;
const RightWrapper = styled.div`
  button {
    margin-left: 16px !important;
  }
`;

const WizardPanel = ({
  SW,
  activeStep,
  errorMsgs,
  prevText = "Go Back",
  nextText = "Continue",
  finishText = "Finish",
  ExtraPanelInfo,
  onFinished,
  formik,
}) => {
  const { totalSteps } = SW;
  const { msgs } = formik.errors;
  const disabledNext = formik.errors && Object.keys(formik.errors).length > 0;
  console.log(formik.errors)
  const [tooltipVisible, setTooltipVisible] = useState(false);
  return (
    <Wrapper>
      <LeftWrapper>{ExtraPanelInfo ? <ExtraPanelInfo></ExtraPanelInfo> : <></>}</LeftWrapper>
      <RightWrapper>
        {activeStep > 1 && <Button onClick={SW.previousStep}>{prevText}</Button>}
        {activeStep < totalSteps ? (
          <Tooltip
            title={
              msgs && (
                <ul>
                  {msgs.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              )
            }
            color="#f50"
            visible={tooltipVisible}
            onVisibleChange={(visible) => setTooltipVisible(visible && disabledNext)}
          >
            <Button disabled={disabledNext} type="primary" onClick={SW.nextStep}>
              {nextText}
            </Button>
          </Tooltip>
        ) : (
          <Button disabled={errorMsgs.length > 0} type="primary" onClick={onFinished}>
            {finishText}
          </Button>
        )}
      </RightWrapper>
    </Wrapper>
  );
};

export default WizardPanel;
