import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { recordDB } from "../firebase/index";

export default () => {
  useEffect(() => {
    recordDB.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    });
  });

  return (
    <div>
      <Button
        onClick={() => {
          recordDB
            .add({ hi: "123" })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      >
        press
      </Button>
      <span></span>
    </div>
  );
};
