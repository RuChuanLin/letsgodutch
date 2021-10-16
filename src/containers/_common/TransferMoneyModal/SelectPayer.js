import { produce } from "immer";
import { Radio, Space, Steps  } from "antd";


import React from "react";
const {Step}= Steps

const SelectPayer = ({ formik }) => {
  const { participants, payer } = formik.values;
  // const { current } = this.state;

  const [current] = React.useState(0);

  return (
    <>
      <Steps type="navigation"  >
        <Step  title="finish 1" />
        <Step   title="finish 2" />
      </Steps>
      {/* <Radio.Group
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
          {Object.entries(participants).map(([name]) => (
            <Radio.Button key={name} value={name}>
              {name}
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group> */}
    </>
  );
};

SelectPayer.validate = (formik) => {
  return true;
};

SelectPayer.title = "請選擇付款人";

export default SelectPayer;
