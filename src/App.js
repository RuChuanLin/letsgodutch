import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";
import TestModal from "./components/TestModal";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllRecords } from "./actions/recordAction";
import { fetchAllUsers } from "./actions/userAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRecords());
    dispatch(fetchAllUsers());
  });

  return (
    <>
      <TestModal></TestModal>
      <Panel></Panel>
      <DataTable></DataTable>
    </>
  );
};
export default App;
