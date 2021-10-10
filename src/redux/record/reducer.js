import { produce } from "immer";

import reducerHandler from "../utils/reducerHandler";

import {
  RECORDS__UPDATE_RECORD,
  RECORDS__REMOVE_RECORD,
  loadAllRecordsActions,
  addNewRecordActions,
} from "./action";
const initialState = { data: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadAllRecordsActions.REQUEST:
    case loadAllRecordsActions.SUCCESS:
    case loadAllRecordsActions.FAILURE:
    case addNewRecordActions.REQUEST:
    case addNewRecordActions.SUCCESS:
    case addNewRecordActions.FAILURE:
      return reducerHandler(state, action);

    case RECORDS__UPDATE_RECORD: {
      const { recordId, updatedRecord } = action.payload;
      return state.map((s) => (s.id === recordId ? updatedRecord : s));
    }

    case RECORDS__REMOVE_RECORD:
      return state.filter(({ id }) => id !== action.payload.recordId);
    default:
      return state;
  }
};

export default reducer;
