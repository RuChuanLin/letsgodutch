import * as yup from "yup";
import styled from "styled-components";
import { Select } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/userAction";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

const { Option } = Select;

const Wrapper = styled.div`
  margin-top: 24px;
`;

const AddUserModal = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <Modal buttonTitle="新增使用者" title="新增使用者">
      <Formik
        initialValues={{ userName: "" }}
        validationSchema={() =>
          yup.object().shape({
            userName: yup.string().required("必須填寫使用者名稱"),
          })
        }
      >
        {(formik) => {
          const {
            values: { userName },
          } = formik;
          return (
            <Form>
              <Wrapper>
                <Input
                  type="text"
                  text="使用者名稱"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Input>
                <ErrorMessage name="userName"></ErrorMessage>
              </Wrapper>
              <Wrapper>
                <Select style={{ width: 150 }}>
                  {Object.entries(users).map(([name]) => (
                    <Option key={name}>{name}</Option>
                  ))}
                </Select>
              </Wrapper>
              <Wrapper>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(addUser({ userName }));
                  }}
                >
                  新增使用者
                </Button>
              </Wrapper>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddUserModal;
