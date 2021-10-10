import { all, takeLatest, put } from "redux-saga/effects";
import { produce } from "immer";
import { snapshots2Docs, snapshot2Data } from "../../utils/dbApiUnification";

import { fetchAllRecordsActions } from "./action";
import { getRecordDB } from "../../firebase";

function* fetchAllRecords(state) {
  try {
    const snapshots = yield getRecordDB().orderBy("date", "desc").get();
    const docs = snapshots2Docs(snapshots);
    const allRecords = docs.map((snapshot) => ({
      ...snapshot2Data(snapshot),
      id: snapshot.id,
    }));
    console.log(state, allRecords);
    yield put(fetchAllRecordsActions.success(allRecords));
  } catch (err) {
    yield put(
      fetchAllRecordsActions.failure(
        produce(state, (draft) => {
          draft.err = err;
        })
      )
    );
  }
}

export default function* recordSaga() {
  yield all([
      takeLatest(fetchAllRecordsActions.REQUEST, fetchAllRecords)
    ]);
}
