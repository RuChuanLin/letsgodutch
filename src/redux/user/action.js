import actionCreator from "../utils/actionCreator";

export const loadAllUsersActions = actionCreator("USER__LOAD_ALL_USERS");
export const addUserActions = actionCreator("USER__ADD_USER");

export const { request: loadAllUsers } = loadAllUsersActions;
export const { request: addUser } = addUserActions;
