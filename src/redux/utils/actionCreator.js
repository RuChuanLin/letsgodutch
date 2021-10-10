/*
  Use this helper function to generate actions and types automatically
  This will return a object generating 3 actions and 3 types:
  {
    FAILURE: "GET_USERS_LIST_FAILURE",
    SUCCESS: "GET_USERS_LIST_SUCCESS",
    REQUEST: "GET_USERS_LIST_REQUEST",
    failure: payload => ({ type, payload, }), // type: GET_USERS_LIST_FAILURE
    success: payload => ({ type, payload, }), // type: GET_USERS_LIST_SUCCESS
    request: payload => ({ type, payload, }), // type: GET_USERS_LIST_REQUEST
  }
*/
const actionCreator = (action) => {
  const values = ["SUCCESS", "FAILURE", "REQUEST"];
  const types = values.reduce((acc, value) => {
    const type = `${action}_${value}`;
    acc[value] = type;
    acc[value.toLowerCase()] = (data) => ({
      type,
      data,
      httpState: value,
    });
    return acc;
  }, {});
  return types;
};

export default actionCreator;
