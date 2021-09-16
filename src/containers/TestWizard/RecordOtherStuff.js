import { Form, InputNumber } from "antd";
import { updateState } from "../../utils/updateState";

const SelectPayer = (props) => {
  const { focusRecord, setFocusRecord } = props;

  return (
    <>
      <Form>
        <Form.Item label="運費">
          <InputNumber
            value={focusRecord?.delivery?.fee || 0}
            onChange={(fee) =>
              updateState({
                originalState: focusRecord,
                setState: setFocusRecord,
                updatedState: { delivery: { $set: { fee } } },
              })
            }
          ></InputNumber>
        </Form.Item>
        <Form.Item label="折扣">
          <InputNumber
            value={focusRecord?.discount?.amount || 0}
            onChange={(amount) =>
              updateState({
                originalState: focusRecord,
                setState: setFocusRecord,
                updatedState: { discount: { $set: { amount } } },
              })
            }
          ></InputNumber>
        </Form.Item>
      </Form>
    </>
  );
};

export default SelectPayer;
