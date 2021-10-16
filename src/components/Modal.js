import React, { useState, Children, cloneElement } from "react";
import { Modal, Button, Spin } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomModal = ({ button, buttonTitle = "Open Modal", okFunction, loading, children }) => {
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
      <StyledModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ overflow: "auto", maxWidth: "448px" }}
      >
        <Spin spinning={loading}>{clonedChildren()}</Spin>
      </StyledModal>
    </>
  );
};

export default CustomModal;
