import { USER__LOAD_ALL_USERS, USER__ADD_USER } from "../constants/userConst";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER__LOAD_ALL_USERS:
      return [...action.payload];
    case USER__ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
