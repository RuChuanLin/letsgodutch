import firebase from "./init";

export const getFocusRecordDB = () => firebase.collection("focusRecord");
export const getRecordDB = () => firebase.collection("records");
export const getUserDB = () => firebase.collection("users");
