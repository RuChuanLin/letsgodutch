import Modal from "../../../components/Modal";

import FormikWizard from "../../../components/FormikWizard";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";
import ResultsPreview from "./ResultsPreview";

const iniValues = {
  delivery: {
    fee: 0,
  },
  discount: {
    amount: 0,
  },
  participants: {
    River: {
      key: "River",
      name: "River",
      targeted: true,
      cost: "",
    },
    Jill: {
      key: "Jill",
      name: "Jill",
      targeted: true,
      cost: "",
    },
    Tony: {
      key: "Tony",
      name: "Tony",
      targeted: true,
      cost: "",
    },
    Gary: {
      key: "Gary",
      name: "Gary",
      targeted: true,
      cost: "",
    },
  },
  payer: "",
};

const components = [SelectParticipants, RecordCost, SelectPayer, RecordOtherStuff, ResultsPreview];

const App = ({ initialValues = iniValues, button, buttonTitle = "新增一筆紀錄", onSubmit }) => (
  <Modal button={button} buttonTitle={buttonTitle}>
    <FormikWizard
      initialValues={initialValues}
      components={components}
      onSubmit={onSubmit}
    ></FormikWizard>
  </Modal>
);

export default App;
