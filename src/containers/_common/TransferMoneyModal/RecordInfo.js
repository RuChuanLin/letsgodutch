// import { produce } from "immer";
// import { Radio, Space, Steps } from "antd";
import FormikSelect from "../../../components/FormikSelect";
import Input from "../../../components/Input";

import React from "react";

const { Option } = FormikSelect;
const SelectPayer = ({ formik }) => {
  const { participants, payer, payee, transferAmount } = formik.values;
  // const  onChange= (value)=> {
  //   console.log(`selected ${value}`);
  // }

  // function onBlur() {
  //   console.log("blur");
  // }

  // function onFocus() {
  //   console.log("focus");
  // }

  // function onSearch(val) {
  //   console.log("search:", val);
  // }
  return (
    <>
      <FormikSelect
        name="payer"
        text="付款人" 
        showSearch
        style={{ width: 155 }}
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {Object.keys(participants).map((participant) => (
          <Option key={participant} value={participant} disabled={payee === participant}>
            {participant}
          </Option>
        ))}
      </FormikSelect>
      <FormikSelect
        name="payee"
        text="收款人"
        showSearch
        style={{ width: 155 }}
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {Object.keys(participants).map((participant) => (
          <Option key={participant} value={participant} disabled={payer === participant}>
            {participant}
          </Option>
        ))}
      </FormikSelect>
      <Input
        text="金額"
        value={transferAmount}
        name="transferAmount"
        placeholder="請輸入金額"
      ></Input>
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
  const errors = {};
  const errorMsgs = [];
  const { transferAmount, payer, payee } = formik.values;
  if (!transferAmount) {
    errorMsgs.push("請輸入金額");
  }
  if (!payer) {
    errorMsgs.push("請選擇付款人");
  }
  if (!payee) {
    errorMsgs.push("請選擇收款人");
  }
  if (errorMsgs.length > 0) {
    errors.errorMsgs = errorMsgs;
  }

  return errors;
};

SelectPayer.title = "請填寫借／還錢資訊";

export default SelectPayer;
