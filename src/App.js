import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRecords } from "./actions/recordAction";
import { fetchFocusRecord } from "./actions/focusRecordAction";
import { fetchAllUsers } from "./actions/userAction";

import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

import TestWizard from './containers/TestWizard'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFocusRecord());
    dispatch(fetchAllRecords());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Panel></Panel>
      <TestWizard></TestWizard>
      <DataTable></DataTable>
    </>
  );
};
export default App;
