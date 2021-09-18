import { updateState } from "../../utils/updateState";

import Input from "../../components/Input";

const SelectPayer = (props) => {
  const { focusRecord, setFocusRecord } = props;

  return (
    <div>
      <Input
        text="運費"
        value={focusRecord?.delivery?.fee || ""}
        onChange={(e) => {
          const { value } = e.target;
          const fee = value === "" ? value : +value;
          updateState({
            originalState: focusRecord,
            setState: setFocusRecord,
            updatedState: { delivery: { $set: { fee } } },
          });
        }}
        placeholder="請輸入運費"
      ></Input>
      <Input
        text="折扣"
        value={focusRecord?.discount?.amount || ""}
        onChange={(e) => {
          const { value } = e.target;
          const amount = value === "" ? value : +value;
          updateState({
            originalState: focusRecord,
            setState: setFocusRecord,
            updatedState: { discount: { $set: { amount } } },
          });
        }}
        placeholder="請輸入折扣"
      ></Input>
      <Input
        type="text"
        text="備註"
        value={focusRecord?.note || ""}
        onChange={(e) => {
          const { value } = e.target;
          updateState({
            originalState: focusRecord,
            setState: setFocusRecord,
            updatedState: { note: { $set: value } },
          });
        }}
      ></Input>
    </div>
  );
};

export default SelectPayer;
