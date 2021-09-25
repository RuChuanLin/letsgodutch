import React, { useState, Children, cloneElement, useEffect } from "react";
import { Popconfirm } from "antd";

const _Popconfirm = ({ children, popconfirmTitle = "title", onConfirm, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(
    () => () => {
      setVisible(null);
      setConfirmLoading(null);
    },
    []
  );

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await onConfirm();
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Popconfirm
        title={popconfirmTitle}
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
        onVisibleChange={(visible) => {
          if (!visible) {
            setVisible(false);
          }
        }}
      >
        {Children.map(children, (child) =>
          cloneElement(child, {
            onClick: showPopconfirm,
            ...props,
          })
        )}
      </Popconfirm>
    </>
  );
};

export default _Popconfirm;
