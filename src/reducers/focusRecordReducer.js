import moment from "moment";
import { FOCUS_RECORD__UPDATE_RECORD } from "../constants/focusRecordConst";

const initialState = {
  date: moment(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FOCUS_RECORD__UPDATE_RECORD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
