import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewRecord } from "../../actions/recordAction";
import StepWizardModal from "../../components/StepWizardModal";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";

const Test = () => {
  const dispatch = useDispatch();

  const [focusRecord, setFocusRecord] = useState({
    participants: {
      River: { key: "River", name: "River", targeted: true, cost: '' },
      Jill: { key: "Jill", name: "Jill", targeted: true, cost: '' },
      Tony: { key: "Tony", name: "Tony", targeted: true, cost: '' },
      Gary: { key: "Gary", name: "Gary", targeted: true, cost: '' },
    },
  });

  const ExtraPanelInfo = () => {
    const { delivery, discount } = focusRecord;
    const totalCost =
      Object.values(focusRecord.participants)
        .filter((participant) => participant.targeted)
        .reduce((acc, cur) => acc + (cur.cost || 0), 0) +
      (delivery?.fee || 0) -
      (discount?.amount || 0);
    return <span>總額：{totalCost}</span>;
  };

  const onFinished = () => {
    dispatch(addNewRecord({ toCloud: true, newRecord: focusRecord }));
  };

  return (
    <>
      <StepWizardModal
        focusRecord={focusRecord}
        setFocusRecord={setFocusRecord}
        ExtraPanelInfo={ExtraPanelInfo}
        onFinished={onFinished}
        stepPages={[
          {
            title: "請選擇參與訂餐人",
            Page: SelectParticipants,
            validate: SelectParticipants.validate,
          },
          {
            title: "輸入金額",
            Page: RecordCost,
          },
          {
            title: "請選擇付款人",
            Page: SelectPayer,
          },
          {
            title: "其他選項",
            Page: RecordOtherStuff,
          },
        ]}
      ></StepWizardModal>
    </>
  );
};

export default Test;
