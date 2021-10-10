

import { loadAllUsersActions, addUserActions } from "./action";
import reducerHandler from "../utils/reducerHandler";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadAllUsersActions.REQUEST:
    case loadAllUsersActions.SUCCESS:
    case loadAllUsersActions.FAILURE:
    case addUserActions.REQUEST:
    case addUserActions.SUCCESS:
    case addUserActions.FAILURE:
      return reducerHandler(state, action);

    // return reducerHandler(
    //   state,
    //   action,
    //   produce(state.data, (draft) => {
    //     draft[action.data.name] = action.data;
    //   }),
    //   action
    // );
    default:
      return state;
  }
};

export default reducer;
