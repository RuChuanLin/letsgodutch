import updateState from "immutability-helper";

import { Radio, Space } from "antd";

const SelectPayer = (props) => {
  const { focusRecord, setFocusRecord } = props;
  const { participants, payer } = focusRecord;

  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        value={payer}
        onChange={(e) => {
          const updatedState = { payer: { $set: e.target.value } };
          setFocusRecord(updateState(focusRecord, updatedState));
        }}
      >
        <Space direction="vertical">
          {Object.entries(participants)
            .filter(([_, participant]) => participant.targeted)
            .map(([name]) => (
              <Radio.Button key={name} value={name}>
                {name}
              </Radio.Button>
            ))}
        </Space>
      </Radio.Group>
    </>
  );
};

export default SelectPayer;
