import { createStore, applyMiddleware } from "redux";
import records from "./record/reducer";
import users from "./reducers/userReducer";

// import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import rootSaga from "./rootSaga";

const loggerMiddleware = createLogger();

const sagaMiddleare = createSagaMiddleware();

const store = createStore(
  combineReducers({
    records,
    users,
  }),
  applyMiddleware(sagaMiddleare, loggerMiddleware)
);
sagaMiddleare.run(rootSaga);

export default store;
