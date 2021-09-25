import { useDispatch } from "react-redux";

import { addNewRecord } from "../../actions/recordAction";
import AddUserModal from "./AddUserModal";
import AddNewRecordModal from "../_common/CURDRecordModal";

const Panel = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        height: "50px",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <AddUserModal></AddUserModal>
      <AddNewRecordModal
        buttonTitle="新增一筆資料"
        onSubmit={(record) => {
          dispatch(addNewRecord({ newRecord: record }));
        }}
      ></AddNewRecordModal>
    </div>
  );
};
export default Panel;
