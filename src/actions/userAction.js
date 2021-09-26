import moment from "moment";

import { getUserDB } from "../firebase";
import { snapshots2Docs, snapshot2Data } from "../utils/dbApiUnification";
export const USER__LOAD_ALL_USERS = "USER__LOAD_ALL_USERS";
export const USER__ADD_USER = "USER__ADD_USER";

export const fetchAllUsers =
  ({ force } = {}) =>
  (dispatch, getState) => {
    const { users = {} } = getState();
    if (Object.keys(users).length === 0 || force) {
      getUserDB()
        .get()
        .then((snapshots) => {
          const docs = snapshots2Docs(snapshots);
          const userObject = docs
            .map(snapshot2Data)
            .reduce((acc, cur) => ({ ...acc, [cur.name]: {} }), {});
          dispatch({ type: USER__LOAD_ALL_USERS, payload: userObject });
        });
    }
  };

export const addUser =
  ({ userName } = {}) =>
  (dispatch) => {
    if (userName) {
      const nameObject = {
        name: userName,
        date: new moment().valueOf(),
      };
      getUserDB()
        .add(nameObject)
        .then(() => {
          dispatch({
            type: USER__ADD_USER,
            payload: { ...nameObject },
          });
        });
    }
  };
