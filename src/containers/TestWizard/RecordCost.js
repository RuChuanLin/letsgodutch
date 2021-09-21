import updateState from "immutability-helper";
import { Form, InputNumber } from "antd";
import Input from "../../components/Input";

const RecordCost = (props) => {
  const { formik, focusRecord, setFocusRecord } = props;
  const { participants } = focusRecord;
  console.log(formik);
  return (
    <>
      {Object.entries(participants)
        .filter(([_, participant]) => participant.targeted)
        .map(([name, participant]) => {
          console.log(formik.errors);
          return (
            <Input
              name={`participants[${name}].cost`}
              key={name}
              text={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik?.touched?.participants?.[name]}
              errors={formik.errors[name]}
              placeholder="enter somthing"
            ></Input>
          );
        })}
    </>
  );
};

export default RecordCost;
export const RecordCostValidator = (formikValues) => {
  const errors = {};
  const { participants } = formikValues;
  Object.values(participants)
    .filter(({ targeted, cost }) => targeted && cost === "")
    .forEach((failed) => {
      errors[failed.key] = failed;
    });
  console.log(errors);
  return errors;
};
