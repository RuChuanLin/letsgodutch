import Modal from "../../../components/Modal";

import FormikWizard from "../../../components/FormikWizard";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";
import ResultsPreview from "./ResultsPreview";

const components = [SelectParticipants, RecordCost, SelectPayer, RecordOtherStuff, ResultsPreview];

const CURDRecordModal = ({ initialValues, button, buttonTitle = "新增一筆記錄", onSubmit }) => {
  return (
    <Modal button={button} buttonTitle={buttonTitle}>
      <FormikWizard
        initialValues={initialValues}
        components={components}
        onSubmit={onSubmit}
      ></FormikWizard>
    </Modal>
  );
};

export default CURDRecordModal;
