import React, { useState, Children, cloneElement } from "react";
import { Modal, Button } from "antd";

const CustomModal = ({ button, buttonTitle = "Open Modal", okFunction, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    okFunction();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const clonedChildren = () =>
    Children.map(children, (child) =>
      cloneElement(child, {
        isModalVisible,
        setIsModalVisible,
      })
    );

  return (
    <>
      {button ? (
        cloneElement(button, {
          onClick: showModal,
        })
      ) : (
        <Button type="primary" onClick={showModal} style={{ marginRight: 12 }}>
          {buttonTitle}
        </Button>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ overflow: "auto", maxWidth: "448px" }}
      >
        {clonedChildren()}
      </Modal>
    </>
  );
};

export default CustomModal;
