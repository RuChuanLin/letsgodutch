import { createStore } from "redux";
import focusRecord from "./reducers/focusRecordReducer";
import records from "./reducers/recordsReducer";
import { combineReducers } from "redux";

const store = createStore(
  combineReducers({
    focusRecord,
    records,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
