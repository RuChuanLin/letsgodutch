import React, { useState } from "react";
import First from "./First";

import StepWizard from "../../components/StepWizard";

const Test = () => {
  const [focusRecord, setFocusRecord] = useState({
    currentStep: 2,
  });
  return (
    <>
      <StepWizard>
        <First></First>
        <First></First>
      </StepWizard>
    </>
  );
};

export default Test;
