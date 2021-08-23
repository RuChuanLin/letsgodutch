import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TestFireBase from "./components/TestFireBase";
import { fetchAllRecords } from "./actions/recordsAction"; 


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRecords())
  });

  return (
    <>
      {/* <TestFireBase></TestFireBase> */}
      <Panel></Panel>
      <DataTable ></DataTable>
    </>
  );
};
export default App;
