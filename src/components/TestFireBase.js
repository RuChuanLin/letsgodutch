import {useEffect}from 'react';
import {use} from 'react-redux'
import { Button } from "antd";
import firebase from "firebase";

export default () => {

    useEffect(() => {
        firebase.initializeApp({
            apiKey: "AIzaSyC_syLiDTXmWb565I3eu65otaLVggyvHts",
            authDomain: "bookkeeping-7d6e7.firebaseapp.com",
            projectId: "bookkeeping-7d6e7",
          });
    })
  

  var db = firebase.firestore();
  db.collection("abc")
    .add({
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  return (
    <div>
      <Button>press</Button>
      <span></span>
    </div>
  );
};
