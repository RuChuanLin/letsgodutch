import Modal from "../../../components/Modal";

import FormikWizard from "../../../components/FormikWizard";

import RecordInfo from "./RecordInfo";

const components = [RecordInfo];

const addNecessaryAttributions = (initialValues) => ({
  participants: initialValues.participants,
  payer: "",
  payee: "",
  transferAmount: "",
});

const TransferMoneyModal = ({ loading, initialValues, button, buttonTitle = "轉錢", onSubmit }) => {
  const values = addNecessaryAttributions(initialValues);
  
  return (
    <Modal loading={loading} button={button} buttonTitle={buttonTitle}>
      <FormikWizard
        initialValues={values}
        components={components}
        onSubmit={onSubmit}
      ></FormikWizard>
    </Modal>
  );
};

export default TransferMoneyModal;
