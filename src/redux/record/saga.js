import moment from "moment";
import { nanoid } from "nanoid";
import { all, takeLatest, put, select } from "redux-saga/effects";
import { snapshots2Docs, snapshot2Data } from "../../utils/dbApiUnification";

import {
  loadAllRecordsActions,
  addNewRecordActions,
  updateRecordActions,
  removeRecordActions,
} from "./action";
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

function* updateRecord({ data }) {
  const { recordId, updatedRecord } = data;
  const allRecords = yield select((state) => state?.records?.data || []);
  try {
    yield getRecordDB().doc(recordId).set(updatedRecord);
    yield put(
      updateRecordActions.success(
        allRecords.map((record) => (record.id === recordId ? updatedRecord : record))
      )
    );
  } catch (e) {}
}

function* removeRecord({ data }) {
  const { removingId } = data;
  const allRecords = yield select((state) => state?.records?.data || []);
  try {
    yield getRecordDB().doc(removingId).delete();
    yield put(removeRecordActions.success(allRecords.filter(({ id }) => id !== removingId)));
  } catch (e) {
    console.log(e);
  }
}

export default function* recordSaga() {
  yield all([
    takeLatest(loadAllRecordsActions.REQUEST, loadAllRecords),
    takeLatest(addNewRecordActions.REQUEST, addNewRecord),
    takeLatest(updateRecordActions.REQUEST, updateRecord),
    takeLatest(removeRecordActions.REQUEST, removeRecord),
  ]);
}
