import Modal from "../../../components/Modal";

import FormikWizard from "../../../components/FormikWizard";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";
import ResultsPreview from "./ResultsPreview";

const initialValues = {
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
  errorMsgs: [],
};

const components = [SelectParticipants, RecordCost, SelectPayer, RecordOtherStuff, ResultsPreview];

const App = () => (
  <Modal>
    <FormikWizard initialValues={initialValues} components={components}></FormikWizard>
  </Modal>
);

export default App;
