import { Form, Input, Select } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../actions/userAction";
import Modal from "../../components/Modal";

const { Option } = Select;

const AddUserModal = () => {
  const users = useSelector((state) => state.users);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  return (
    <Modal
      buttonTitle="新增使用者"
      title="新增使用者"
      okFunction={() => {
        dispatch(addUser({ userName }));
        setUserName("");
      }}
    >
      <Form>
        <Form.Item
          label="使用者名稱"
          rules={[
            {
              message: "輸入使用者名稱",
              required: true,
            },
          ]}
        >
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Select style={{ width: 150 }}>
          {Object.entries(users).map(([name]) => (
            <Option key={name}>{name}</Option>
          ))}
        </Select>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
