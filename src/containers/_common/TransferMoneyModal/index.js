import { Spin } from "antd";
import Modal from "../../../components/Modal";

import FormikWizard from "../../../components/FormikWizard";

import SelectPayer from "./SelectPayer";
import SelectPayee from "./SelectPayee";
// import RecordCost from "./RecordCost";
// import SelectPayer from "./SelectPayer";
// import RecordOtherStuff from "./RecordOtherStuff";
// import ResultsPreview from "./ResultsPreview";

const components = [SelectPayer, SelectPayee];

const TransferMoneyModal = ({ loading, initialValues, button, buttonTitle = "轉錢", onSubmit }) => {
  return (
    <Modal loading={loading} button={button} buttonTitle={buttonTitle}>
      <FormikWizard
        initialValues={initialValues}
        components={components}
        onSubmit={onSubmit}
      ></FormikWizard>
    </Modal>
  );
};

export default TransferMoneyModal;
