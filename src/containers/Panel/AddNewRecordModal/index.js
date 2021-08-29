import React, { useRef } from "react";

import StepCarouselModal from "../../../components/StepCarouselModal";

import SelectParticipants from "./SelectParticipants";
import TestPage from "./TestPage";

const AddNewRecordModal = () => {
  const receiveChildValue = (value) => {
    console.log(value);
  };

  const selectParticipantRef = useRef();
  const TestPageRef = useRef();

  const components = [
    <SelectParticipants ref={selectParticipantRef}></SelectParticipants>,
    <TestPage ref={TestPageRef}></TestPage>,
  ];

  const refs = [selectParticipantRef, TestPageRef];

  return (
    <>
      <StepCarouselModal buttonTitle="新增一筆訂餐資料" refs={refs}>
        {components.map((component, i) => (
          <div key={`component${i}`}>{component}</div>
        ))}
      </StepCarouselModal>
    </>
  );
};

export default AddNewRecordModal;
