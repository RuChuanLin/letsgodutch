import { Transfer } from "antd";
import { filterParticipants } from "../../../utils/common";
import { updateState } from "../../../utils/updateState";
import { produce } from "immer";

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
    // TODO 改成用 immer
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

SelectParticipants.validate = (formik) => {
  const errors = {};
  const errorMsgs = [];
  const { participants } = formik.values;
  if (filterParticipants(participants).length < 2) {
    errorMsgs.push("至少需選取2個訂餐人");
  }

  if (errorMsgs.length > 0) {
    errors.errorMsgs = errorMsgs;
  }

  return errors;
};

SelectParticipants.title = "請選擇參與訂餐人";

export default SelectParticipants;
