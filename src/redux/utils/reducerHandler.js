const reducerHandler = (state, action, data) => {
  switch (action.httpState) {
    case "REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        data: data ? data : action.data,
        isLoading: false,
        error: null,
      };
    case "FAILURE":
      return {
        ...state,
        isLoading: false,
        error: data ? data : action.data,
        data: null,
      };
    default:
      return state;
  }
};

export default reducerHandler;
