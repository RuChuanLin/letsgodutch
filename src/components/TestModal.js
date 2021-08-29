import React, { useState } from "react";
import { Modal, Button, Carousel } from "antd";

const CustomModal = ({
  buttonTitle = "Open Modal",
  title,
  okFunction,
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
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

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
        <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </Modal>
    </>
  );
};

export default CustomModal;
