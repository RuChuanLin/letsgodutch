import { getRecordDB } from "../../firebase";
import actionCreator from "../utils/actionCreator";

export const loadAllRecordsActions = actionCreator("RECORDS__LOAD_ALL_RECORD");
export const addNewRecordActions = actionCreator("RECORDS__ADD_RECORD");
export const updateRecordActions = actionCreator("RECORDS__UPDATE_RECORD");
export const removeRecordActions = actionCreator("RECORDS__REMOVE_RECORD");

export const { request: loadAllRecords } = loadAllRecordsActions;
export const { request: addNewRecord } = addNewRecordActions;
export const { request: updateRecord } = updateRecordActions;
export const { request: removeRecord } = removeRecordActions;

