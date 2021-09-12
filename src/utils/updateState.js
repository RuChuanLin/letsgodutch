import update from "immutability-helper";

export const updateState = ({ setState, originalState, updatedState }) => {
  setState(update(originalState, updatedState));
};
