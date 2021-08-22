import { RECORDS__ADD_RECORD } from "../constants/recordsConst";

export const addNewRecord = (newRecord) => {
  return { type: RECORDS__ADD_RECORD, payload: newRecord };
};
