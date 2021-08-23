import {
  RECORDS__ADD_RECORD,
  RECORDS__LOAD_ALL_RECORD,
} from "../constants/recordsConst";
import { recordDB } from "../firebase";

export const fetchAllRecords = () => (dispatch, getState) => {
  //   const { counter } = getState();
  recordDB.get().then((snapshots) => {
    const allRecords = snapshots.docs.map((snapshot) => snapshot.data());
    console.log(allRecords)
    dispatch({ type: RECORDS__LOAD_ALL_RECORD, payload: allRecords });
  });
};

export const addNewRecord = (newRecord) => {
  return { type: RECORDS__ADD_RECORD, payload: newRecord };
};
