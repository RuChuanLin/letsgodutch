import React from "react";
import { Field } from "formik";

export default ({ touched, errors }) => {
  console.log(touched, errors)
  return (
    <div>
      <label>First Name*: </label>
      <Field name="firstName" id="firstName" />
      {touched.firstName && typeof errors.firstName === "string" && errors.firstName}
      <br />
      <br />
      <label>Last Name: </label>
      <Field name="lastName" id="lastName" />
      <br />
      <br />
      <label>Date of Birth: </label>
      <Field name="dob" id="dob" />
    </div>
  );
};
