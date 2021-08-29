import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Transfer } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { updateFocusRecord } from "../../../actions/focusRecordAction";

const genUserData = ({ users, focusRecord }) => {
  const userObject = {};
  Object.keys(users).forEach((key) => {
    userObject[key] = {
      key,
      name: key,
      cost: 0,
      selected: false,
      targeted: false,
    };
  });

  Object.entries(focusRecord.participants).forEach(
    ([name, { cost, selected, targeted }]) => {
      userObject[name] = userObject[name] || {
        key: name,
        name: name,
        cost,
        selected,
        targeted,
      };
    }
  );
  return userObject;
};

const SelectParticipants = forwardRef((props, ref) => {
  const { users, focusRecord } = useSelector((state) => state);

  const userObject = genUserData({ users, focusRecord });
  const userData = Object.values(userObject);

  const [selectedKeys, setSelectedKeys] = useState(
    userData.filter(({ selected }) => selected).map(({ name }) => name)
  );

  const [targetKeys, setTargetKeys] = useState(
    userData.filter(({ targeted }) => targeted).map(({ name }) => name)
  );

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    fn: () => {
      const participants = targetKeys.map((targetKey) => userObject[targetKey]);
      dispatch(updateFocusRecord({ participants }));
    },
  }));

  return (
    <>
      {/* <h2>請選擇參與訂餐人</h2> */}
      <Transfer
        dataSource={userData}
        titles={["未訂餐", "有要訂餐"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.name}
      ></Transfer>
    </>
  );
});

export default SelectParticipants;
