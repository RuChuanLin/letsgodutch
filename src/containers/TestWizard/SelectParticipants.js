import { Transfer } from "antd";
import { filterParticipants } from "../../utils/common";
import { updateState } from "../../utils/updateState";

const filterObject = (participants, filterKey) =>
  filterParticipants(participants, { filter: { [filterKey]: true } }).map(([name]) => name);

const SelectParticipants = ({ formik }) => {
  const { participants } = formik.values;
  const participantChangeHandler = (options) => {
    const patchObject = {};
    options.forEach(({ keys, action }) => {
      const keySet = new Set(keys);
      Object.entries(participants).forEach(([name, obj]) => {
        const included = keySet.has(name);
        if (obj[action] !== included) {
          if (!patchObject[name]) {
            patchObject[name] = {};
          }
          patchObject[name][action] = { $set: included };
        }
      });
    });
    return { participants: patchObject };
  };

  const onChange = (nextTargetKeys) => {
    updateState({
      originalState: { participants },
      updatedState: participantChangeHandler([
        { keys: [], action: "selected" },
        { keys: nextTargetKeys, action: "targeted" },
      ]),
      setState: formik.setValues,
    });
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    updateState({
      originalState: { participants },
      updatedState: participantChangeHandler([{ keys: selectedKeys, action: "selected" }]),
      setState: formik.setValues,
    });
  };

  return (
    <>
      <Transfer
        dataSource={Object.values(participants)}
        titles={["未訂餐", "有要訂餐"]}
        targetKeys={filterObject(participants, "targeted")}
        selectedKeys={filterObject(participants, "selected")}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.name}
      ></Transfer>
    </>
  );
};

export default SelectParticipants;

export const SelectParticipantsValidator = (formikValues) => {
  console.log(formikValues);
  const errors = {};
  const errorMsgs = [];
  const { participants } = formikValues;
  if (filterParticipants(participants).length < 2) {
    errorMsgs.push("至少需選取2個訂餐人");
  }
  if (errorMsgs.length > 0) {
    errors.msgs = errorMsgs;
  }
  return errors;
};
