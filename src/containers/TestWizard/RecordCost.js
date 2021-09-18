import updateState from "immutability-helper";
import { Form, InputNumber } from "antd";
import Input from "../../components/Input";

const RecordCost = (props) => {
  const { focusRecord, setFocusRecord } = props;
  const { participants } = focusRecord;
  return (
    <>
      <div>
        {Object.entries(participants)
          .filter(([_, participant]) => participant.targeted)
          .map(([name, participant]) => {
            return (
              <Input
                key={name}
                text={name}
                value={participant.cost}
                onChange={(e) => {
                  const { value } = e.target;
                  const cost = value === "" ? value : +value;
                  const change = {
                    participants: { [name]: { cost: { $set: cost } } },
                  };
                  const updatedFocusRecord = updateState(focusRecord, change);
                  setFocusRecord(updatedFocusRecord);
                }}
                placeholder="enter somthing"
              ></Input>
            );
          })}
      </div>
    </>
  );
};

export default RecordCost;
