import { withFormik } from "formik";
import * as Yup from "yup";

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

export default withFormik({
  displayName: "WizardForm",
  enableReinitialize: true,
  mapPropsToValues: () => initialValues,
  validationSchema: () =>
    Yup.object().shape({
      // errorMsgs: Yup.
      // .required("First name is required"),
      // email: Yup.string().required("Email is required"),
      // addressLine1: Yup.string().required("Address Line 1 is required"),
    }),
  handleSubmit: (values) => {
    console.log(values);
  },
});
