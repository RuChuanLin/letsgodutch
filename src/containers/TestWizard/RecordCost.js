import Input from "../../components/Input";
import { filterParticipants } from "../../utils/common";

const RecordCost = ({ formik }) => {
  const { participants } = formik.values;
  return (
    <>
      {filterParticipants(participants).map(([name]) => (
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
      ))}
    </>
  );
};

export default RecordCost;
export const RecordCostValidator = (formikValues) => {
  const errors = {};
  const { participants } = formikValues;
  filterParticipants(participants, { filter: { targeted: true, cost: "" } }).forEach(
    ([_, failed]) => {
      errors[failed.key] = failed;
    }
  );
  return errors;
};
