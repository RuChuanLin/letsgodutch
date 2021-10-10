import moment from "moment";
import { nanoid } from "nanoid";
import { all, takeLatest, put } from "redux-saga/effects";
import { snapshots2Docs, snapshot2Data } from "../../utils/dbApiUnification";
import { getUserDB } from "../../firebase";
import { loadAllUsersActions, addUserActions } from "./action";

function* loadAllUsers() {
  try {
    const snapshots = yield getUserDB().get();
    const docs = snapshots2Docs(snapshots);
    const userObject = docs
      .map(snapshot2Data)
      .reduce((acc, cur) => ({ ...acc, [cur.name]: {} }), {});
    yield put(loadAllUsersActions.success(userObject));
  } catch (err) {
    yield put(loadAllUsersActions.failure(err));
  }
}

function* addUser({ data }) {
  const { userName } = data;
  if (userName) {
    try {
      const id = nanoid();
      const nameObject = {
        name: userName,
        date: new moment().valueOf(),
        id,
      };
      yield getUserDB().doc(id).set(nameObject);
      yield put(addUserActions.success(nameObject));
    } catch (err) {
      yield put(addUserActions.failure(err));
    }
  }
}

export default function* recordSaga() {
  yield all([takeLatest(loadAllUsersActions.REQUEST, loadAllUsers)]);
  yield all([takeLatest(addUserActions.REQUEST, addUser)]);
}
