import React, { useState, useRef } from "react";

import _StepWizard from "react-step-wizard";

import { Carousel } from "antd";

import WizardPanel from "./WizardPanel";

const StepWizard = ({ title, okFunction, childElementPackages, children }) => {
  const contentStyle = {};

  const [stepIndex, setStepIndex] = useState(0);

  const slider = useRef();
  //   const callButtonMethod = () => {
  //     const { currentSlide } = slider.current.innerSlider.state;
  //     getChildElementPackage(currentSlide)?.fn?.();
  //   };

  return (
    <div>
      <Carousel
        lazyLoad="ondemand"
        style={contentStyle}
        beforeChange={(_, i) => setStepIndex(i)}
        dots={false}
        infinite={false}
        ref={(ref) => (slider.current = ref)}
      >
        {children}
      </Carousel>
      <WizardPanel
        currentStepIndex={stepIndex}
        totalSteps={children.length}
        getStepControl={() => slider.current}
      ></WizardPanel>
    </div>
  );
};

export default StepWizard;

// const StepWizard = (props) => {
//   console.log(props);
//   const { stepPages, initialState, setInitialState } = props;
//   const { currentStep } = initialState;
//   console.log(currentStep);
//   return (
//     <>
//       <_StepWizard currentStep={currentStep}>
//         {stepPages.map((Step, i) => {
//           const step = i + 1;
//           return (
//             <div>
//               <Step
//                 hashKey={"Step" + step}
//                 key={"Step" + step}
//                 step={step}
//                 initialState={initialState}
//                 setInitialState={setInitialState}
//                 {...props}
//               ></Step>
//               <WizardPanel {...props}></WizardPanel>
//             </div>
//           );
//         })}
//       </_StepWizard>
//     </>
//   );
// };

// export default StepWizard;
