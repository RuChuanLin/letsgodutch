import React, { useState } from "react";
import { Modal, Button } from "antd";

const CustomModal = ({buttonTitle = 'Open Modal', title, okFunction, children}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    okFunction()
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonTitle}
      </Button>
      <Modal
        title={title}
        visible={isModalVisible}
        footer={[]}
        onCancel={handleCancel}
      >
       {children}
      </Modal>
    </>
  );
};

export default CustomModal;
