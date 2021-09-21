import { USER__LOAD_ALL_USERS, USER__ADD_USER } from "../constants/userConst";
import { getUserDB } from "../firebase";

export const fetchAllUsers =
  ({ force } = {}) =>
  (dispatch, getState) => {
    const { users = {} } = getState();
    if (Object.keys(users).length === 0 || force) {
      getUserDB()
        .get()
        .then((snapshots) => {
          const userObject = snapshots.docs
            .map((snapshot) => snapshot.data())
            .reduce((acc, cur) => ({ ...acc, [cur.name]: {} }), {});
          dispatch({ type: USER__LOAD_ALL_USERS, payload: userObject });
        });
    }
  };

export const addUser =
  ({ userName } = {}) =>
  (dispatch, getState) => {
    if (userName) {
      const nameObject = {
        name: userName,
      };
      getUserDB()
        .add(nameObject)
        .then(() => {
          dispatch({ type: USER__ADD_USER, payload: nameObject });
        });
    }
  };
