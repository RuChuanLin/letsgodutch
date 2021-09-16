import updateState from "immutability-helper";
import { Form, InputNumber } from "antd";

const RecordCost = (props) => {
  const { focusRecord, setFocusRecord } = props;
  const { participants } = focusRecord;

  return (
    <>
      <Form>
        {Object.entries(participants)
          .filter(([_, participant]) => participant.targeted)
          .map(([name, participant]) => {
            return (
              <Form.Item key={name} label={name}>
                <InputNumber
                  value={participant.cost || 0}
                  onChange={(cost) => {
                    const change = {
                      participants: { [name]: { cost: { $set: cost } } },
                    };
                    const updatedFocusRecord = updateState(focusRecord, change);
                    setFocusRecord(updatedFocusRecord);
                  }}
                ></InputNumber>
              </Form.Item>
            );
          })}
      </Form>
    </>
  );
};

export default RecordCost;
