import { produce } from "immer";
import { Radio, Space } from "antd";

const SelectPayer = ({ formik }) => {
  const { participants, payer, payee = "" } = formik.values;
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        value={payee}
        onChange={(e) => {
          formik.setValues(
            produce(formik.values, (draft) => {
              draft.payee = e.target.value;
            })
          );
        }}
      >
        <Space direction="vertical">
          {Object.entries(participants).map(([name]) => (
            <Radio.Button disabled={name === payer} key={name} value={name}>
              {name}
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group>
    </>
  );
};

SelectPayer.validate = (formik) => {
  return true;
};

SelectPayer.title = "請選擇收款人";

export default SelectPayer;
