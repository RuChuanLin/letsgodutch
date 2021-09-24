import FormikWizard from "../../../components/FormikWizard";

import SelectParticipants from "./SelectParticipants";
import RecordCost from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";

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

const components = [SelectParticipants, RecordCost, SelectPayer, RecordOtherStuff];

function AddNewRecord() {
  return <FormikWizard initialValues={initialValues} components={components}></FormikWizard>;
}

export default AddNewRecord;
