import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRecords } from "./actions/recordAction";
import { fetchFocusRecord } from "./actions/focusRecordAction";
import { fetchAllUsers } from "./actions/userAction";

import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

import FormikWizard from "./components/FormikWizard";

import steps from './steps'
function FormWrapper({ children, isLastStep, status, goToPreviousStep, canGoBack, actionLabel }) {
  return (
    <div>
      {status && (
        <div>
          {status.message}
          <hr />
        </div>
      )}
      <div>
        <button type="button" onClick={goToPreviousStep} disabled={!canGoBack}>
          Previous
        </button>
        <button type="submit">{actionLabel || (isLastStep ? "Submit" : "Next step")}</button>
      </div>
      <hr />
      {children}
    </div>
  );
}

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchFocusRecord());
  //   dispatch(fetchAllRecords());
  //   dispatch(fetchAllUsers());
  // }, [dispatch]);
  const handleSubmit = React.useCallback((values) => {
    console.log("full values:", values);

    return {
      message: "Thanks for submitting!",
    };
  }, []);
  return (
    <>
      {/* <Panel></Panel>
      <DataTable></DataTable> */}
      <FormikWizard steps={steps} onSubmit={handleSubmit} render={FormWrapper} />
    </>
  );
};
export default App;
