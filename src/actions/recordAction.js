import moment from "moment";

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

export const addNewRecord =
  ({ toCloud = true, newRecord }) =>
  async (dispatch) => {
    if (!newRecord) {
      return;
    }
    const arrangedRecord = { ...newRecord, date: new moment().valueOf() };
    if (toCloud) {
      const addedObject = await getRecordDB().add(arrangedRecord);
      const id = getIdFromAddedObject(addedObject);
      dispatch({ type: RECORDS__ADD_RECORD, payload: { ...arrangedRecord, id } });
    } else {
      dispatch({ type: RECORDS__ADD_RECORD, payload: arrangedRecord });
    }
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
