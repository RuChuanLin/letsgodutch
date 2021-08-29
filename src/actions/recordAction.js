import {
  RECORDS__ADD_RECORD,
  RECORDS__LOAD_ALL_RECORD,
} from "../constants/recordConst";
import { getRecordDB } from "../firebase";

export const fetchAllRecords =
  ({ force } = {}) =>
  (dispatch, getState) => {
    const { records } = getState();
    if (records.length === 0 || force) {
      getRecordDB()
        .orderBy("date", "desc")
        .get()
        .then((snapshots) => {
          const allRecords = snapshots.docs.map((snapshot) => snapshot.data());
          console.log(allRecords)
          dispatch({ type: RECORDS__LOAD_ALL_RECORD, payload: allRecords });
        });
    } else {
      dispatch({ type: RECORDS__LOAD_ALL_RECORD, payload: records });
    }
  };

export const addNewRecord = (newRecord) => {
  return { type: RECORDS__ADD_RECORD, payload: newRecord };
};
