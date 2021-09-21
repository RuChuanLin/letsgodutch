import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "formik";

const FormikWizard = (props) => {
  useEffect(() => {
    props.validateForm();
  }, []);
  const getValidators = (validatorFuncs) => validatorFuncs.map((func) => () => func({ ...props }));

  return (
    <Form>
      {props.children({
        getValidators: (validators) => getValidators(validators),
        ...props,
      })}
    </Form>
  );
};

FormikWizard.propTypes = {
  validateForm: PropTypes.func,
  children: PropTypes.func,
};

export default FormikWizard;
