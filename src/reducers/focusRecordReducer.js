import moment from "moment";
import {
  FOCUS_RECORD__UPDATE_RECORD,
  FOCUS_RECORD__RESET_RECORD,
} from "../constants/focusRecordConst";

import update from "immutability-helper";

const initialState = {
  // date: moment().valueOf(),
  delivery: {
    fee: 0,
  },
  discount: {
    amount: 0,
  },
  participants: {},
  payer: "",
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FOCUS_RECORD__UPDATE_RECORD:
      return update(state, action.payload);
    case FOCUS_RECORD__RESET_RECORD:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
