import {
  RECORDS__LOAD_ALL_RECORD,
  RECORDS__ADD_RECORD,
  RECORDS__UPDATE_RECORD,
  RECORDS__REMOVE_RECORD,
} from "../actions/recordAction";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORDS__ADD_RECORD:
      return [action.payload, ...state];
    case RECORDS__LOAD_ALL_RECORD:
      return [...action.payload];
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
