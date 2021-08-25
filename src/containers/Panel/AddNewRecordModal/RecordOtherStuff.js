import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Input } from "antd";
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
      <Form>
        <Form.Item label="運費">
          <Input
            type="number"
            value={optional?.delivery?.fee || 0}
            onChange={(e) =>
              setOptional({ ...optional, delivery: { fee: +e.target.value } })
            }
          ></Input>
        </Form.Item>
        <Form.Item label="折扣">
          <Input
            type="number"
            value={optional?.discount?.amount || 0}
            onChange={(e) =>
              setOptional({
                ...optional,
                discount: { amount: +e.target.value },
              })
            }
          ></Input>
        </Form.Item>
      </Form>
    </>
  );
});

export default SelectPayer;
