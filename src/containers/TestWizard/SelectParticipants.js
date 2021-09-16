import React from "react";
import { Transfer } from "antd";
import {useSelector} from 'react-redux'


const filterObject = ({ participants }, filterKey) =>
  Object.entries(participants)
    .filter(([_, v]) => v?.[filterKey])
    .map(([name]) => name);

const SelectParticipants = (props) => {
  const a = useSelector(state=>state.focusRecord)
  
  const { focusRecord, setFocusRecord } = props;
  const { participants } = focusRecord;

  const participantChangeHandler = (keys, action) => {
    const newParticipants = { ...participants };
    for (const participant in newParticipants) {
      newParticipants[participant][action] = false;
    }
    for (const key of keys) {
      newParticipants[key][action] = true;
    }
    return newParticipants;
  };

  const onChange = (nextTargetKeys) => {
    const targetedCount = nextTargetKeys.length;
    const newFocusRecord = {
      ...focusRecord,
      errorMsgs: {
        ...focusRecord.errorMsgs,
        ["至少需選擇兩位參與者"]: targetedCount < 2,
      },
      participants: participantChangeHandler(nextTargetKeys, "targeted"),
    };
    setFocusRecord(newFocusRecord);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    setFocusRecord({
      ...focusRecord,
      participants: participantChangeHandler(selectedKeys, "selected"),
    });
  };

  return (
    <>
      <Transfer
        dataSource={Object.values(participants)}
        titles={["未訂餐", "有要訂餐"]}
        targetKeys={filterObject(focusRecord, "targeted")}
        selectedKeys={filterObject(focusRecord, "selected")}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.name}
      ></Transfer>
    </>
  );
};

export default SelectParticipants;
