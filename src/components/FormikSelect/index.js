import { Select } from "antd";
import Field from "../FormikField";

export const FormikSelect = ({
  text,
  name,
  validate,
  fast,
  children,
  onChange,
  onBlur,
  ...restProps
}) => {
  return (
    <Field text={text} name={name} validate={validate} fast={fast}>
      {({ field: { value }, form: { setFieldValue, setFieldTouched } }) => (
        <Select
          onChange={(value, option) => {
            setFieldValue(name, value);
            onChange && onChange(value, option);
          }}
          onBlur={(value) => {
            setFieldTouched(name);
            onBlur && onBlur(value);
          }}
          value={value === "" || value === null ? undefined : value}
          {...restProps}
        >
          {children}
        </Select>
      )}
    </Field>
  );
};

FormikSelect.Option = Select.Option;

export default FormikSelect;
