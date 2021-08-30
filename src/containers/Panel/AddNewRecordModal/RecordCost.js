import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Input } from "antd";
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
      <Form>
        {Object.entries(participants).map((participant) => {
          const [name] = participant;
          return (
            <Form.Item key={name} label={name}>
              <Input
                type="number"
                value={costs[name] || 0}
                onChange={(e) => setCosts({ ...costs, [name]: +e.target.value })}
              ></Input>
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
});

export default RecordCost;
