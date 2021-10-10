import reducerHandler from "../utils/reducerHandler";

import {
  loadAllRecordsActions,
  addNewRecordActions,
  updateRecordActions,
  removeRecordActions,
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
    case updateRecordActions.REQUEST:
    case updateRecordActions.SUCCESS:
    case updateRecordActions.FAILURE:
    case removeRecordActions.REQUEST:
    case removeRecordActions.SUCCESS:
    case removeRecordActions.FAILURE:
      return reducerHandler(state, action);

    default:
      return state;
  }
};

export default reducer;
