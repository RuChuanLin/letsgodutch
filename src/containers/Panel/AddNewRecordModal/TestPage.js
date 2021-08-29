import React, { forwardRef, useImperativeHandle } from "react";

const TestPage = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    fn: () => {
      console.log(321);
    },
  }));

  return (
    <>
      <div>321</div>
    </>
  );
});

export default TestPage;
