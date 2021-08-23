import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import Modal from "../components/Modal";

import { useSelector, useDispatch } from "react-redux";
import { updateFocusRecord } from "../actions/focusRecordAction";
import { addNewRecord } from "../actions/recordsAction";

import { recordDB } from "../firebase";

import moment from "moment";

const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Panel = () => {
  const [form] = Form.useForm();

  const record = useSelector((state) => state.focusRecord);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal
        title="新增一筆資料"
        okFunction={() => {
          recordDB.add(record).then(() => dispatch(addNewRecord(record)));
        }}
      >
        <Form
          name="basic"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="DatePicker">
            <DatePicker
              value={moment(record?.date)}
              onChange={(e) =>
                dispatch(
                  updateFocusRecord({
                    date: e ? e.valueOf() : moment().valueOf(),
                  })
                )
              }
            />
          </Form.Item>
          <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={(payer) => {
                dispatch(updateFocusRecord({ payer }));
              }}
              value={record?.payer}
            >
              {["River", "Jill", "Tony", "Gary"].map((name) => (
                <Option key={name}>{name}</Option>
              ))}
            </Select>
          </Form.Item>
          {["River", "Jill", "Tony", "Gary"].map((name) => (
            <Form.Item
              key={name}
              label={name}
              rules={[
                {
                  message: "輸入點餐金額！",
                },
              ]}
            >
              <Input
                type="number"
                value={record?.participants?.[name] || 0}
                onChange={(e) => {
                  dispatch(
                    updateFocusRecord({
                      participants: {
                        ...record.participants,
                        [name]: +e.target.value,
                      },
                    })
                  );
                }}
                placeholder="點餐金額，不輸入代表沒點餐"
              />
            </Form.Item>
          ))}

          <Form.Item
            label="運費"
            rules={[
              {
                message: "輸入運費",
              },
            ]}
          >
            <Input
              type="number"
              value={record?.delivery?.fee || 0}
              onChange={(e) => {
                dispatch(
                  updateFocusRecord({
                    delivery: {
                      fee: +e.target.value,
                    },
                  })
                );
              }}
              placeholder="點餐金額，不輸入代表沒點餐"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Panel;
