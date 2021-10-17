import React, { useState, Children, cloneElement } from "react";
import { Modal, Button, Spin } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  color: #eee;
  margin-right: 16px;
  border-radius: 16px;
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
  }
  &:active {
    color: #fff;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: rgba(255, 255, 255, 0.7) 0px 0px 8px 4px;
  }
  &:focus {
    color: #eee;
  }
`;

const StyledModal = styled(Modal)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomModal = ({
  button,
  buttonTitle = "Open Modal",
  okFunction,
  loading = false,
  children,
}) => {
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
        <StyledButton loading={loading} type="text" onClick={showModal}>
          {buttonTitle}
        </StyledButton>
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
