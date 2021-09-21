import { useEffect } from "react";

import Input from "../../components/Input";
import { filterParticipants } from "../../utils/common";

const RecordCost = ({ formik }) => {
  const { participants } = formik.values;
  
  useEffect(() => {
    console.log(123)
    formik.validateForm();
  }, []);

  
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
  const errorMsgs = [];
  const { participants } = formikValues;
  filterParticipants(participants, { filter: { targeted: true, cost: "" } }).forEach(
    ([_, failed]) => {
      errors[failed.key] = failed;
    }
  );

  if (Object.keys(errors).length > 0) {
    errorMsgs.push("有問題");
  }

  if (errorMsgs.length > 0) {
    errors.msgs = errorMsgs;
  }
  return errors;
};
