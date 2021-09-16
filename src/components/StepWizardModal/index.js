import React, { useState, useRef } from "react";
import { Modal, Button, Typography, Carousel } from "antd";

import WizardPanel from "./WizardPanel";

const StepWizard = ({
  focusRecord,
  setFocusRecord,
  stepPages,
  ExtraPanelInfo,

  buttonTitle = "Open Modal",
  title,
  okFunction,
  children,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    okFunction();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
    <>
      <Button type="primary" onClick={showModal} style={{ marginRight: 12 }}>
        {buttonTitle}
      </Button>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        
        footer={[
          <WizardPanel
            ExtraPanelInfo={ExtraPanelInfo}
            errorMsgs={validate()}
            currentStepIndex={currentStepIndex}
            totalSteps={stepPages.length}
            getStepControl={() => slider.current}
          ></WizardPanel>,
        ]}
        centered
      >
        <Typography.Title level={3}>{getPageInfo()?.title}</Typography.Title>
        <Carousel
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
      </Modal>
    </>
  );
};
export default StepWizard;
