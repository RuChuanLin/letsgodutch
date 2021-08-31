import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { resetFocusRecord } from "../../../actions/focusRecordAction";
import { addNewRecord } from "../../../actions/recordAction";

const SelectPayer = forwardRef((props, ref) => {
  const { focusRecord } = useSelector((state) => state);
  const [optional, setOptional] = useState({});

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      fn: () => {
        const newRecord = { ...focusRecord, ...optional };
        dispatch(addNewRecord({ newRecord, toCloud: true }));
        dispatch(resetFocusRecord());
      },
    };
  });
  return (
    <>
      <h2>其他選項</h2>
      <Form>
        <Form.Item label="運費">
          <InputNumber
            value={optional?.delivery?.fee || 0}
            onChange={(fee) => setOptional({ ...optional, delivery: { fee } })}
          ></InputNumber>
        </Form.Item>
        <Form.Item label="折扣">
          <InputNumber
            value={optional?.discount?.amount || 0}
            onChange={(amount) =>
              setOptional({
                ...optional,
                discount: { amount },
              })
            }
          ></InputNumber>
        </Form.Item>
      </Form>
    </>
  );
});

export default SelectPayer;
