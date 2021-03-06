import AddUserModal from "./AddUserModal";
import AddNewRecordModal from "./AddNewRecordModal";
import TransferMoney from './TransferMoney'

const Panel = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <TransferMoney></TransferMoney>
      <AddUserModal></AddUserModal>
      <AddNewRecordModal></AddNewRecordModal>
    </div>
  );
};
export default Panel;
