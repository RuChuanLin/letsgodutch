import { Transfer } from "antd";
import { filterParticipants } from "../../../utils/common";
import { produce } from "immer";

const filterObject = (participants, filterKey) =>
  filterParticipants(participants, { filter: { [filterKey]: true } }).map(([name]) => name);

const participantChangeHandler = (draft, options) => {
  options.forEach(({ keys, action }) => {
    const keySet = new Set(keys);
    Object.entries(draft.participants).forEach(([name, obj]) => {
      const included = keySet.has(name);
      if (obj[action] !== included) {
        draft.participants[name][action] = included;
      }
    });
  });
};

const SelectParticipants = ({ formik }) => {
  const { participants } = formik.values;

  const onChange = (nextTargetKeys) => {
    formik.setValues(
      produce(formik.values, (draft) => {
        participantChangeHandler(draft, [
          { keys: [], action: "selected" },
          { keys: nextTargetKeys, action: "targeted" },
        ]);
      })
    );
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    formik.setValues(
      produce(formik.values, (draft) => {
        participantChangeHandler(draft, [{ keys: selectedKeys, action: "selected" }]);
      })
    );
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
