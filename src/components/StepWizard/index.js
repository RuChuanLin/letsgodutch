import React, { useState, useRef } from "react";

import { Typography, Carousel } from "antd";

import WizardPanel from "./WizardPanel";

const StepWizard = ({ focusRecord, setFocusRecord, stepPages }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const getPageInfo = () => stepPages[currentStepIndex];

  const slider = useRef();
  //   const callButtonMethod = () => {
  //     const { currentSlide } = slider.current.innerSlider.state;
  //     getChildElementPackage(currentSlide)?.fn?.();
  //   };

  return (
    <div>
      <Typography.Title>{getPageInfo()?.title}</Typography.Title>
      <Carousel
        lazyLoad="ondemand"
        beforeChange={(_, i) => setCurrentStepIndex(i)}
        dots={false}
        infinite={false}
        ref={(ref) => (slider.current = ref)}
      >
        {stepPages.map((stepPage, i) => {
          const step = `step${i}`;
          return <stepPage.Page key={step}></stepPage.Page>;
        })}
      </Carousel>
      <WizardPanel
        validation={getPageInfo()?.validate ? getPageInfo()?.validate() : true}
        currentStepIndex={currentStepIndex}
        totalSteps={stepPages.length}
        getStepControl={() => slider.current}
      ></WizardPanel>
    </div>
  );
};
export default StepWizard;
