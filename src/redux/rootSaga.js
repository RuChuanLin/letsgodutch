import { all } from "redux-saga/effects";

import userSaga from "./user/saga";
import recordSaga from "./record/saga";

export default function* rootSaga() {
  yield all([userSaga(), recordSaga()]);
}
