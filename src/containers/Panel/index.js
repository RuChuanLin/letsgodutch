import React from "react";

import AddUserModal from "./AddUserModal";
// import AddNewRecordModal from "./AddNewRecordModal";
import TestWizard from '../TestWizard'


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
      <TestWizard></TestWizard>
      {/* <AddNewRecordModal></AddNewRecordModal> */}
    </div>
  );
};
export default Panel;
