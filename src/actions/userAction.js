import { USER__LOAD_ALL_USERS, USER__ADD_USER } from "../constants/userConst";
import { getUserDB } from "../firebase";

export const fetchAllUsers =
  ({ force } = {}) =>
  (dispatch, getState) => {
    const { users = [] } = getState();
    if (users.length === 0 || force) {
      getUserDB()
        .get()
        .then((snapshots) => {
          const allUsers = snapshots.docs.map((snapshot) => snapshot.data());
          dispatch({ type: USER__LOAD_ALL_USERS, payload: allUsers });
        });
    } else {
      dispatch({ type: USER__LOAD_ALL_USERS, payload: users });
    }
  };

export const addUser =
  ({ userName } = {}) =>
  (dispatch, getState) => {
    if (userName) {
      const nameObject = { name: userName };
      getUserDB()
        .add(nameObject)
        .then(() => {
          dispatch({ type: USER__ADD_USER, payload: nameObject });
        });
    }
  };
