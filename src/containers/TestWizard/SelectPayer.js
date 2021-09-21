import { produce } from "immer";
import { Radio, Space } from "antd";

const SelectPayer = ({ formik }) => {
  const { participants, payer } = formik.values;
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        value={payer}
        onChange={(e) => {
          formik.setValues(
            produce(formik.values, (draft) => {
              draft.payer = e.target.value;
            })
          );
        }}
      >
        <Space direction="vertical">
          {Object.entries(participants)
            .filter(([_, participant]) => participant.targeted)
            .map(([name]) => (
              <Radio.Button key={name} value={name}>
                {name}
              </Radio.Button>
            ))}
        </Space>
      </Radio.Group>
    </>
  );
};

SelectPayer.validate = (formik) => {
  const errors = {};
  const errorMsgs = [];
  const { payer } = formik.values;

  if (!payer) {
    errorMsgs.push("請選擇付款人");
  }

  if (errorMsgs.length > 0) {
    errors.errorMsgs = errorMsgs;
  }
  return errors;
};

SelectPayer.title = "請選擇付款人";

export default SelectPayer;
