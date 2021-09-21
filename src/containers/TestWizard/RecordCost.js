import Input from "../../components/Input";
import { filterParticipants } from "../../utils/common";

const RecordCost = ({ formik }) => {
  const { participants } = formik.values;

  return (
    <>
      {filterParticipants(participants).map(([name]) => {
        return (
          <Input
            name={`participants[${name}].cost`}
            key={name}
            text={name}
            value={formik?.values?.participants?.[name]?.cost}
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

RecordCost.validate = (formik) => {
  const errors = {};
  const errorMsgs = [];
  const { participants } = formik.values;
  const existUnfilled =
    filterParticipants(participants, { filter: { targeted: true, cost: "" } }).length > 0;

  if (existUnfilled) {
    errorMsgs.push("需填寫所有訂餐人金額。若沒有訂餐請回上一步移除訂餐人。");
  }

  if (errorMsgs.length > 0) {
    errors.errorMsgs = errorMsgs;
  }
  return errors;
};

RecordCost.title = "請輸入訂餐金額";

export default RecordCost;
