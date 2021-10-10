const reducerHandler = (state, action) => {
  switch (action.httpState) {
    case "REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.data,
        error: null,
      };
    case "FAILURE":
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.data,
        data: null,
      };
    default:
      return state;
  }
};

export default reducerHandler;
