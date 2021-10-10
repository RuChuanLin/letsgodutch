import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRecords } from "./redux/record/action";
import { fetchAllUsers } from "./redux/actions/userAction";
import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRecords());
    // dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Panel></Panel>
      <DataTable></DataTable>
    </>
  );
};
export default App;
