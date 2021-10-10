import { produce } from "immer";

import reducerHandler from "../utils/reducerHandler";

import {
  RECORDS__ADD_RECORD,
  RECORDS__UPDATE_RECORD,
  RECORDS__REMOVE_RECORD,
  loadAllRecordsActions,
} from "./action";
const initialState = { data: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadAllRecordsActions.REQUEST:
    case loadAllRecordsActions.SUCCESS:
    case loadAllRecordsActions.FAILURE:
      return reducerHandler(state, action);

    case RECORDS__ADD_RECORD:
      return [action.payload, ...state];

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
