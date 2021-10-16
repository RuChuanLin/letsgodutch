import { useSelector, useDispatch } from "react-redux";
import TransferMoneyModal from "../_common/TransferMoneyModal";
import { addNewRecord } from "../../redux/record/action";
import { genNewRecordObject } from "../../utils/common";

const TransferMoney = () => {
  const userObject = useSelector((state) => state?.users || {});

  const { data: users = {}, loading } = userObject;
  const initNewTransferRecord = { ...genNewRecordObject(users), type: "TRANSFER_MONEY" };
  const dispatch = useDispatch();

  return (
    <TransferMoneyModal
      initialValues={initNewTransferRecord}
      buttonTitle="轉錢"
      loading={loading}
      onSubmit={(record) => {
        dispatch(addNewRecord(record));
      }}
    ></TransferMoneyModal>
  );
};

export default TransferMoney;
