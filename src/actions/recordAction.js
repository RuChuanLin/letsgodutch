import moment from "moment";
import { nanoid } from "nanoid";
import { getRecordDB } from "../firebase";
import { snapshots2Docs, snapshot2Data, getIdFromAddedObject } from "../utils/dbApiUnification";

export const RECORDS__LOAD_ALL_RECORD = "RECORDS__LOAD_ALL_RECORD";
export const RECORDS__ADD_RECORD = "RECORDS__ADD_RECORD";
export const RECORDS__UPDATE_RECORD = "RECORDS__UPDATE_RECORD";
export const RECORDS__REMOVE_RECORD = "RECORDS__REMOVE_RECORD";

export const fetchAllRecords =
  ({ force } = {}) =>
  (dispatch, getState) => {
    const { records } = getState();
    if (records.length === 0 || force) {
      getRecordDB()
        .orderBy("date", "desc")
        .get()
        .then((snapshots) => {
          console.log(snapshots)
          const docs = snapshots2Docs(snapshots);
          const allRecords = docs.map((snapshot) => ({
            ...snapshot2Data(snapshot),
            id: snapshot.id,
          }));
          dispatch({ type: RECORDS__LOAD_ALL_RECORD, payload: allRecords });
        });
    } else {
      dispatch({ type: RECORDS__LOAD_ALL_RECORD, payload: records });
    }
  };

export const addNewRecord = (newRecord) => async (dispatch) => {
  if (!newRecord) {
    return;
  }
  const id = nanoid();
  const arrangedRecord = { ...newRecord, date: new moment().valueOf(), id };
  const { data } = await getRecordDB().doc(id).set(arrangedRecord);
  dispatch({ type: RECORDS__ADD_RECORD, payload: data });
};

export const updateRecord = (recordId, updatedRecord) => async (dispatch) => {
  try {
    await getRecordDB().doc(recordId).set(updatedRecord);
    dispatch({ type: RECORDS__UPDATE_RECORD, payload: { recordId, updatedRecord } });
  } catch (e) {}
};

export const removeRecord = (recordId) => async (dispatch) => {
  try {
    await getRecordDB().doc(recordId).delete();

    dispatch({ type: RECORDS__REMOVE_RECORD, payload: { recordId } });
  } catch (e) {}
};
