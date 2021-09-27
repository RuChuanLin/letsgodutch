import CURDRecordModal from "../_common/CURDRecordModal";
import { useSelector, useDispatch } from "react-redux";
import { addNewRecord } from "../../actions/recordAction";
import { genNewRecordObject } from "../../utils/common";

const AddNewRecordModal = () => {
  const users = useSelector((state) => state.users);

  const initNewRecord = genNewRecordObject(users);
  const dispatch = useDispatch();

  return (
    <CURDRecordModal
      initialValues={initNewRecord}
      buttonTitle="新增一筆資料"
      onSubmit={(record) => {
        dispatch(addNewRecord(record));
      }}
    ></CURDRecordModal>
  );
};

export default AddNewRecordModal;
