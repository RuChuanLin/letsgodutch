import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Radio, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { updateFocusRecord } from "../../../actions/focusRecordAction";

const SelectPayer = forwardRef((props, ref) => {
  const { users, focusRecord } = useSelector((state) => state);
  const [payer, setPayer] = useState("");

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    const { participants } = focusRecord;
    const payerCost = participants[payer] || 0;
    return {
      fn: () =>
        dispatch(
          updateFocusRecord({
            participants: { ...participants, [payer]: payerCost },
            payer,
          })
        ),
    };
  });

  return (
    <>
      <h2>請選擇付款人</h2>
      <Radio.Group
        buttonStyle="solid"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      >
        <Space direction="vertical">
          {Object.keys(users).map((name) => (
            <Radio.Button key={name} value={name}>
              {name}
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group>
    </>
  );
});

export default SelectPayer;
