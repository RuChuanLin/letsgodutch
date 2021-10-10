import moment from "moment";
import { nanoid } from "nanoid";
import { all, takeLatest, put, select } from "redux-saga/effects";
import { produce } from "immer";
import { snapshots2Docs, snapshot2Data } from "../../utils/dbApiUnification";

import { loadAllRecordsActions, addNewRecordActions } from "./action";
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

function* addNewRecord({ data: newRecord }) {
  if (!newRecord) {
    return;
  }
  const id = nanoid();
  const arrangedRecord = { ...newRecord, date: new moment().valueOf(), id };

  try {
    yield getRecordDB().doc(id).set(arrangedRecord);
    const allRecords = yield select((state) => state?.records?.data || []);

    yield put(addNewRecordActions.success([arrangedRecord, ...allRecords]));
  } catch (err) {
    yield put(addNewRecordActions.failure(err));
  }
}

export default function* recordSaga() {
  yield all([
    takeLatest(loadAllRecordsActions.REQUEST, loadAllRecords),
    takeLatest(addNewRecordActions.REQUEST, addNewRecord),
  ]);
}
