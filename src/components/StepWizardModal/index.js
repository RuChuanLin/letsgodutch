import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";
import styled from "styled-components";
import Wizard from "react-step-wizard";
import WizardPanel from "./WizardPanel";

import "./transitions.css";

const transitions = {
  enterRight: `animated enterRight`,
  enterLeft: `animated enterLeft`,
  exitRight: `animated exitRight`,
  exitLeft: `animated exitLeft`,
  intro: `animated intro`,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 260px;
`;

const StepWizard = ({
  focusRecord,
  setFocusRecord,
  stepPages,
  ExtraPanelInfo,
  buttonTitle = "Open Modal",
  title,
  onFinished,
}) => {
  const [state, setState] = useState({
    activeStep: 0,
    isModalVisible: false,
  });

  const showModal = () => {
    setState({ ...state, isModalVisible: true });
  };

  const handleCancel = () => {
    setState({ ...state, isModalVisible: false });
  };
  const setInstance = (SW) =>
    setState({
      ...state,
      SW,
    });

  const { SW, activeStep } = state;

  const onStepChange = ({ activeStep }) => {
    setState({ ...state, activeStep });
  };

  const validate = () => {
    // const { errorMsgs } = focusRecord;
    // if (!errorMsgs) {
    //   return true;
    // }
    // return Object.entries(errorMsgs)
    //   .filter(([_, existError]) => existError)
    //   .map(([errorMsg]) => errorMsg);
    return true; // TODO 之後研究怎麼寫驗證
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginRight: 12 }}>
        {buttonTitle}
      </Button>
      <Modal
        style={{ overflow: "auto" }}
        title={title}
        visible={state.isModalVisible}
        onCancel={handleCancel}
        footer={[
          SW && (
            <WizardPanel
              SW={SW}
              activeStep={activeStep}
              ExtraPanelInfo={ExtraPanelInfo}
              errorMsgs={true}
              totalSteps={stepPages.length}
              onFinished={() => {
                onFinished();
                handleCancel();
              }}
            ></WizardPanel>
          ),
        ]}
        centered
      >
        <Wizard
          onStepChange={onStepChange}
          transitions={transitions}
          instance={setInstance}
        >
          {stepPages.map((stepPage, i) => {
            const step = `step${i}`;
            return (
              <Wrapper key={step}>
                <Typography.Title level={3}>{stepPage?.title}</Typography.Title>
                <stepPage.Page
                  focusRecord={focusRecord}
                  setFocusRecord={setFocusRecord}
                ></stepPage.Page>
              </Wrapper>
            );
          })}
        </Wizard>
      </Modal>
    </>
  );
};
export default StepWizard;
