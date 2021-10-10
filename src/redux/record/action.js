import moment from "moment";
import { nanoid } from "nanoid";
import { getRecordDB } from "../../firebase";
import actionCreator from "../utils/actionCreator";

export const RECORDS__ADD_RECORD = "RECORDS__ADD_RECORD";
export const RECORDS__UPDATE_RECORD = "RECORDS__UPDATE_RECORD";
export const RECORDS__REMOVE_RECORD = "RECORDS__REMOVE_RECORD";

export const loadAllRecordsActions = actionCreator("RECORDS__LOAD_ALL_RECORD");

export const { request: loadAllRecords } = loadAllRecordsActions;


export const addNewRecord = (newRecord) => async (dispatch) => {
  if (!newRecord) {
    return;
  }
  const id = nanoid();
  const arrangedRecord = { ...newRecord, date: new moment().valueOf(), id };
  try {
    await getRecordDB().doc(id).set(arrangedRecord);
    dispatch({ type: RECORDS__ADD_RECORD, payload: arrangedRecord });
  } catch (e) {
    // TODO 錯誤處理
    // dispatch({ type: RECORDS__ADD_RECORD, payload: arrangedRecord });
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
