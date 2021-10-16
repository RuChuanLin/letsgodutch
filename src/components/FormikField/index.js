import { Field, FastField } from "formik";
import FieldWrapper from "../_wrapper/FieldWrapper";

export const FormikField = ({ text, fast, children, ...restProps }) => (
  <FieldWrapper text={text}>
    {fast ? (
      <FastField {...restProps}>{children}</FastField>
    ) : (
      <Field {...restProps}>{children}</Field>
    )}
  </FieldWrapper>
);
export default FormikField;
