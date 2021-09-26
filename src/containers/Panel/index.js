import AddUserModal from "./AddUserModal";
import AddNewRecordModal from "./AddNewRecordModal";

const Panel = () => {
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
      <AddNewRecordModal></AddNewRecordModal>
    </div>
  );
};
export default Panel;
