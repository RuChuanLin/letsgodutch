import React, { useState } from "react";
import { Typography } from "antd";
import StepWizard from "react-step-wizard";
import WizardPanel from "./WizardPanel";
import "./transitions.css";

const transitions = {
  enterRight: `animated enterRight`,
  enterLeft: `animated enterLeft`,
  exitRight: `animated exitRight`,
  exitLeft: `animated exitLeft`,
  intro: `animated intro`,
};

const Wizard = ({ focusRecord, setFocusRecord, stepPages, ExtraPanelInfo }) => {
  const [state, setState] = useState({
    activeStep: 0,
  });

  const setInstance = (SW) =>
    setState({
      ...state,
      SW,
    });

  const { SW, activeStep } = state;

  const onStepChange = ({ activeStep }) => {
    setState({ ...state, activeStep });
  };

  return (
    <div>
      <StepWizard onStepChange={onStepChange} transitions={transitions} instance={setInstance}>
        {stepPages.map((stepPage, i) => {
          const step = `step${i}`;
          return (
            <div key={step}>
              <Typography.Title level={3}>{stepPage?.title}</Typography.Title>
              <stepPage.Page
                focusRecord={focusRecord}
                setFocusRecord={setFocusRecord}
              ></stepPage.Page>
            </div>
          );
        })}
      </StepWizard>
      {SW && (
        <WizardPanel
          SW={SW}
          activeStep={activeStep}
          ExtraPanelInfo={ExtraPanelInfo}
          errorMsgs={true}
          totalSteps={stepPages.length}
        ></WizardPanel>
      )}
    </div>
  );
};

export default Wizard;
