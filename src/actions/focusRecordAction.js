import { FOCUS_RECORD__UPDATE_RECORD } from "../constants/focusRecordConst";

import { getFocusRecordDB } from "../firebase";

export const fetchFocusRecord =
  ({ force } = {}) =>
  (dispatch, getState) => {
    // const { focusRecord } = getState();
    getFocusRecordDB()
      .get()
      .then((snapshots) => {
        const focusRecord = snapshots.docs?.[0]?.data?.();
        dispatch({ type: FOCUS_RECORD__UPDATE_RECORD, payload: focusRecord });
      });
  };

export const updateFocusRecord = (payload) => {
  return { type: FOCUS_RECORD__UPDATE_RECORD, payload };
};
