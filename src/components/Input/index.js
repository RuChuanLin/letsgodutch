import FieldWrapper from "../_wrapper/FieldWrapper";
import Field from "./Field";
import Text from "../../components/Text";

const InputItem = ({ text, width, ...props }) => {
  return (
    <FieldWrapper text={text} width={width}>
      <Field {...props}></Field>
    </FieldWrapper>
  );
};

export default InputItem;
