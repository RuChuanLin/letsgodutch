import { all, takeLatest, put, call } from "redux-saga/effects";
import { produce } from "immer";
import { snapshots2Docs, snapshot2Data } from "../../utils/dbApiUnification";

import { loadAllRecordsActions } from "./action";
import { getRecordDB } from "../../firebase";

function* loadAllRecords() {
  try {
    const snapshots = yield getRecordDB().orderBy("date", "desc").get();
    const docs = snapshots2Docs(snapshots);
    const allRecords = docs.map((snapshot) => ({
      ...snapshot2Data(snapshot),
      id: snapshot.id,
    }));
    yield put(loadAllRecordsActions.success(allRecords));
  } catch (err) {
    yield put(loadAllRecordsActions.failure(err));
  }
}

export default function* recordSaga() {
  yield all([takeLatest(loadAllRecordsActions.REQUEST, loadAllRecords)]);
}
