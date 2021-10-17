import { produce } from "immer";
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
        const { payer, payee, transferAmount } = record;
        const resultRecord = produce(initNewTransferRecord, (draft) => {
          Object.entries(draft.participants).forEach(([name, obj]) => {
            if (name !== payee && name !== payer) {
              obj.targeted = false;
            }
          });
          draft.participants[payee].cost = transferAmount;
          draft.participants[payer].cost = 0;
          draft.payer = payer;
          draft.note = `${payer}轉給${payee} ${transferAmount}元`;
        });
        console.log(resultRecord);
        dispatch(addNewRecord(resultRecord));
      }}
    ></TransferMoneyModal>
  );
};

export default TransferMoney;
