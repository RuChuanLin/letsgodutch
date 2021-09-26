import { createStore, applyMiddleware } from "redux";
import records from "./reducers/recordReducer";
import users from "./reducers/userReducer";

import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers({
    records,
    users,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
