import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAllRecords } from "./redux/record/action";
import { loadAllUsers } from "./redux/user/action";
import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllRecords());
    dispatch(loadAllUsers());
  }, [dispatch]);

  return (
    <>
      <Panel></Panel>
      <DataTable></DataTable>
    </>
  );
};
export default App;
