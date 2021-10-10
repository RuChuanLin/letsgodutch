const reducerHandler = (state, action, data) => {
  switch (action.httpState) {
    case "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        data: data ? data : action.data,
        loading: false,
        error: null,
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        error: data ? data : action.data,
        data: null,
      };
    default:
      return state;
  }
};

export default reducerHandler;
