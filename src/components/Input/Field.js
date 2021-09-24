import styled from "styled-components";

import { FastField } from "formik";
import colors from "../../utils/colors";

const Field = styled(FastField)`
  outline: none;
  cursor: pointer;
  width: 155px;
  height: 36px;
  border-radius: 2px;
  border: 1px
    ${({ errors, touched }) => {
      return errors && touched ? "red" : colors.getGray(0.2);
    }}
    solid;
  padding-left: 4px;
  font-size: ${(props) => props.fontSize}px;
  transition: 0.2s ease-in-out;
  &:hover {
    border: 1px ${colors.getGray(0.25)} solid;
    background-color: ${colors.getGray(0.15)};
  }
  /* &:focus {
    background-color: ${colors.white};
    border: 1px ${colors.primaryBackgroundLight} solid;
  } */
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default ({ type = "number", ...props }) => (
  <Field type={type} {...props}></Field>
);
