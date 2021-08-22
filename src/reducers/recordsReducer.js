import { RECORDS__ADD_RECORD } from "../constants/recordsConst";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORDS__ADD_RECORD:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
