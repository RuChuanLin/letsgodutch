import React, { useState } from "react";
import First from "./First";

import StepWizard from "../../components/StepWizard";

const Test = () => {
  const [focusRecord, setFocusRecord] = useState({});
  return (
    <>
      <StepWizard
        focusRecord={focusRecord}
        setFocusRecord={setFocusRecord}
        stepPages={[
          {
            title: "First Page",
            Page: First,
            validate: () => false,
          },
          {
            title: "Second Page",
            Page: First,
          },
        ]}
      ></StepWizard>
    </>
  );
};

export default Test;
