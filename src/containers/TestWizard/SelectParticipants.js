import React from "react";
import { Transfer } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { updateFocusRecord } from "../../actions/focusRecordAction";

const filterObject = ({ participants }, filterKey) =>
  Object.entries(participants)
    .filter(([_, v]) => v?.[filterKey])
    .map(([name]) => name);

const SelectParticipants = () => {
  const focusRecord = useSelector((state) => state.focusRecord);
  const dispatch = useDispatch();
  const setFocusRecord = (patch) => dispatch(updateFocusRecord(patch));

  const { participants } = focusRecord;

  const participantChangeHandler = (keys, action) => {
    const keySet = new Set(keys);
    const patchObject = {};
    Object.entries(participants).forEach(([name, obj]) => {
      const included = keySet.has(name);
      if (obj[action] !== included) {
        if (!patchObject[name]) {
          patchObject[name] = {};
        }
        patchObject[name][action] = { $set: included };
      }
    });
    return { participants: patchObject };
  };

  const onChange = (nextTargetKeys) => {
    setFocusRecord(participantChangeHandler(nextTargetKeys, "targeted"));
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    setFocusRecord(participantChangeHandler(selectedKeys, "selected"));
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
