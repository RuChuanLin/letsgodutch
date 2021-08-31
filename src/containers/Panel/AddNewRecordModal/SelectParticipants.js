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
      targeted: true,
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

const filterObject = (userObject, filterKey) =>
  Object.entries(userObject)
    .filter(([_, v]) => v?.[filterKey])
    .map(([name]) => name);

const SelectParticipants = forwardRef((props, ref) => {
  const { users, focusRecord } = useSelector((state) => state);

  const [userObject, setUserObject] = useState(
    genUserData({ users, focusRecord })
  );

  const onChange = (nextTargetKeys) => {
    const allKeySet = new Set(Object.keys(userObject));
    const newUserObject = { ...userObject };

    nextTargetKeys.forEach((targetKey) => {
      newUserObject[targetKey].targeted = true;
      allKeySet.delete(targetKey);
    });
    allKeySet.forEach((unselectedKey) => {
      newUserObject[unselectedKey].targeted = false;
    });
    setUserObject(newUserObject);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    const allKeySet = new Set(Object.keys(userObject));
    const newUserObject = { ...userObject };

    selectedKeys.forEach((selectKey) => {
      newUserObject[selectKey].selected = true;
      allKeySet.delete(selectKey);
    });
    allKeySet.forEach((unselectedKey) => {
      newUserObject[unselectedKey].selected = false;
    });

    setUserObject(newUserObject);
  };

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    const participants = Object.entries(userObject).reduce(
      (acc, [name, obj]) => {
        return obj.targeted ? { ...acc, [name]: obj } : acc;
      },
      {}
    );
    return {
      fn: () => dispatch(updateFocusRecord({ participants })),
    };
  });

  return (
    <>
      <h2>請選擇參與訂餐人</h2>
      <Transfer
        dataSource={Object.values(userObject)}
        titles={["未訂餐", "有要訂餐"]}
        targetKeys={filterObject(userObject, "targeted")}
        selectedKeys={filterObject(userObject, "selected")}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.name}
      ></Transfer>
    </>
  );
});

export default SelectParticipants;
