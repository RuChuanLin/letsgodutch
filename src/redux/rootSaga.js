import { all } from "redux-saga/effects";

import recordSaga from "./record/saga";

export default function* rootSaga() {
  yield all([recordSaga()]);
}
