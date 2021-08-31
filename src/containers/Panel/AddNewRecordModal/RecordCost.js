import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { updateFocusRecord } from "../../../actions/focusRecordAction";

const RecordCost = forwardRef((props, ref) => {
  const { focusRecord } = useSelector((state) => state);
  const { participants } = focusRecord;

  const [costs, setCosts] = useState(
    Object.entries(participants).reduce(
      (acc, [name, obj]) => ({
        ...acc,
        [name]: obj?.cost || 0,
      }),
      {}
    )
  );

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      fn: () => dispatch(updateFocusRecord({ participants: costs })),
    };
  });
  return (
    <>
      <h2>輸入金額</h2>
      <Form>
        {Object.entries(participants).map((participant) => {
          const [name] = participant;
          return (
            <Form.Item key={name} label={name}>
              <InputNumber
                value={costs[name] || 0}
                onChange={(cost) => setCosts({ ...costs, [name]: cost })}
              ></InputNumber>
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
});

export default RecordCost;
