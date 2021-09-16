import update from "immutability-helper";

export const updateState = ({ setState, originalState, updatedState }) => {
  setState(update(originalState, updatedState));
};

export const getUpdatedState = ({ originalState, updatedState }) =>
  update(originalState, updatedState);
