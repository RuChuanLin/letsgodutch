import React, { useState } from "react";
<<<<<<< HEAD
import { Modal, Button, Carousel } from "antd";

const CustomModal = ({
  buttonTitle = "Open Modal",
  title,
  okFunction,
  children,
}) => {
=======
import { Modal, Button } from "antd";

const CustomModal = ({buttonTitle = 'Open Modal', title, okFunction, children}) => {
>>>>>>> efc7147 (createTEstButton)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
<<<<<<< HEAD
    okFunction();
=======
    okFunction()
>>>>>>> efc7147 (createTEstButton)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
<<<<<<< HEAD
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
=======
>>>>>>> efc7147 (createTEstButton)

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
<<<<<<< HEAD
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
=======
       {children}
>>>>>>> efc7147 (createTEstButton)
      </Modal>
    </>
  );
};

export default CustomModal;
