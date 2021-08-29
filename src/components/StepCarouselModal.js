import React, { useState, useRef } from "react";
import { Modal, Button, Carousel } from "antd";
const StepCarouselModal = ({
  buttonTitle = "Open Modal",
  title,
  okFunction,
  childElementPackages,
  children,
  refs,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    okFunction();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const contentStyle = {};

  const [slideIndex, setSlideIndex] = useState(0);

  const slider = useRef();

  const getChildElementPackage = (slideIndex) => refs?.[slideIndex]?.current;
  const callButtonMethod = () => {
    const { currentSlide } = slider.current.innerSlider.state;
    getChildElementPackage(currentSlide)?.fn?.();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonTitle}
      </Button>
      <Modal
        title={title || buttonTitle}
        visible={isModalVisible}
        footer={[
          <Button
            onClick={() => {
              callButtonMethod();
              slider.current.prev();
            }}
            hidden={slideIndex === 0}
          >
            {getChildElementPackage()?.prev?.buttonText || "Prev"}
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              callButtonMethod();
              slider.current.next();
            }}
            disabled={getChildElementPackage()?.next?.rules.every(
              (rule) => rule
            )}
          >
            {getChildElementPackage()?.next?.buttonText || "Next"}
          </Button>,
        ]}
        onOk={() => {
          slider.current.next();
        }}
        onCancel={handleCancel}
        centered
      >
        <Carousel
          style={contentStyle}
          beforeChange={(_, i) => setSlideIndex(i)}
          dots={false}
          infinite={false}
          ref={(ref) => (slider.current = ref)}
        >
          {children}
        </Carousel>
      </Modal>
    </>
  );
};

export default StepCarouselModal;
