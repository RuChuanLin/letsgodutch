import {
  RECORDS__ADD_RECORD,
  RECORDS__LOAD_ALL_RECORD,
} from "../constants/recordsConst";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORDS__ADD_RECORD:
      return [action.payload, ...state];
    case RECORDS__LOAD_ALL_RECORD:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
