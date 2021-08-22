import { FOCUS_RECORD__UPDATE_RECORD } from "../constants/focusRecordConst";

export const updateFocusRecord = (payload) => {
  return { type: FOCUS_RECORD__UPDATE_RECORD, payload };
};
