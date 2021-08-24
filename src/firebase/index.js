import firebase from "./init";

export const getRecordDB = () => firebase.collection("records");
export const getUserDB = () => firebase.collection("users");
