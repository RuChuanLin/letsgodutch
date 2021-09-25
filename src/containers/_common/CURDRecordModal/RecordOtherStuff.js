import { produce } from "immer";

import Input from "../../../components/Input";

const SelectPayer = ({ formik }) => {
  // const { focusRecord, setFocusRecord } = props;
  const { delivery, discount, note } = formik.values;
  return (
    <div>
      <Input
        text="運費"
        value={delivery?.fee || ""}
        onChange={(e) => {
          const { value } = e.target;
          const fee = value === "" ? value : +value;
          formik.setValues(
            produce(formik.values, (draft) => {
              draft.delivery.fee = fee;
            })
          );
        }}
        placeholder="請輸入運費"
      ></Input>
      <Input
        text="優惠"
        value={discount?.amount || ""}
        onChange={(e) => {
          const { value } = e.target;
          const amount = value === "" ? value : +value;
          formik.setValues(
            produce(formik.values, (draft) => {
              draft.discount.amount = amount;
            })
          );
        }}
        placeholder="請輸入優惠"
      ></Input>
      <Input
        type="text"
        text="備註"
        value={note || ""}
        onChange={(e) => {
          const { value } = e.target;
          formik.setValues(
            produce(formik.values, (draft) => {
              draft.note = value;
            })
          );
        }}
      ></Input>
    </div>
  );
};

SelectPayer.title = "其他選項";

export default SelectPayer;
