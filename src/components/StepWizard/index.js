import React, { useState, useRef } from "react";

import { Typography, Carousel } from "antd";

import WizardPanel from "./WizardPanel";

const StepWizard = ({ focusRecord, setFocusRecord, stepPages }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const getPageInfo = () => stepPages[currentStepIndex];

  const slider = useRef();

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
    <div>
      <Typography.Title level={3}>{getPageInfo()?.title}</Typography.Title>
      <Carousel
        lazyLoad="ondemand"
        beforeChange={(_, i) => setCurrentStepIndex(i)}
        dots={false}
        infinite={false}
        ref={(ref) => (slider.current = ref)}
      >
        {stepPages.map((stepPage, i) => {
          const step = `step${i}`;
          return (
            <stepPage.Page
              key={step}
              focusRecord={focusRecord}
              setFocusRecord={setFocusRecord}
            ></stepPage.Page>
          );
        })}
      </Carousel>
      <WizardPanel
        errorMsgs={validate()}
        currentStepIndex={currentStepIndex}
        totalSteps={stepPages.length}
        getStepControl={() => slider.current}
      ></WizardPanel>
    </div>
  );
};
export default StepWizard;
