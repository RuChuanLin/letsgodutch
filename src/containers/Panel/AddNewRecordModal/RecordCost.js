import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";

const RecordCost = forwardRef((props, ref) => {
  const { focusRecord } = useSelector((state) => state);
  const participants = Object.entries(focusRecord.participants).filter(
    ([_, { targeted }]) => targeted
  );

  useImperativeHandle(ref, () => ({
    fn: () => {
      console.log(participants);
      console.log(321);
    },
  }));

  return (
    <>
      <Form>
        {participants.map((participant) => (
          <Form.Item label={participant[0]}>
            <Input></Input>
          </Form.Item>
        ))}
      </Form>
    </>
  );
});

export default RecordCost;
