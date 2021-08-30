import React, { useRef } from "react";

import StepCarouselModal from "../../../components/StepCarouselModal";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";

const AddNewRecordModal = () => {
  const receiveChildValue = (value) => {
    console.log(value);
  };

  const selectParticipantRef = useRef();
  const RecordCostRef = useRef();

  const components = [
    <SelectParticipants ref={selectParticipantRef}></SelectParticipants>,
    <RecordCost ref={RecordCostRef}></RecordCost>,
  ];

  const refs = [selectParticipantRef, RecordCostRef];

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
