import { createStore, applyMiddleware } from "redux";
// import focusRecord from "./reducers/focusRecordReducer";
import records from "./reducers/recordReducer";
import users from "./reducers/userReducer";

import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers({
    // focusRecord,
    records,
    users,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
