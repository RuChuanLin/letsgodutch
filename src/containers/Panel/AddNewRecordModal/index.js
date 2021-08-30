import React, { useRef } from "react";

import StepCarouselModal from "../../../components/StepCarouselModal";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";

const AddNewRecordModal = () => {
  const receiveChildValue = (value) => {
    console.log(value);
  };

  const selectParticipantRef = useRef();
  const recordCostRef = useRef();
  const selectPayerRef = useRef();
  const recordOtherStuff = useRef();

  const components = [
    <SelectParticipants ref={selectParticipantRef}></SelectParticipants>,
    <RecordCost ref={recordCostRef}></RecordCost>,
    <SelectPayer ref={selectPayerRef}></SelectPayer>,
    <RecordOtherStuff ref={recordOtherStuff}></RecordOtherStuff>,
  ];

  const refs = [
    selectParticipantRef,
    recordCostRef,
    selectPayerRef,
    recordOtherStuff,
  ];

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
