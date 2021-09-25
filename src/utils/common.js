/**
 * filter participants
 *
 * this project requires to filter out untargete or unselected participants frequently, so we need a independant funtion to deal with it.
 *
 * note: this function use a memorization to minimize the amount of calculation.
 */
const filterParticipants = (() => {
  let [memoIniObject, memoFinishedObject] = [null, null];
  let [memoIniOptionsObject] = [null];
  return (
    participantObject,
    options = {
      filter: { targeted: true },
    }
  ) => {
    if (participantObject === memoIniObject && memoIniOptionsObject === options) {
      return memoFinishedObject;
    }
    memoIniObject = participantObject;
    memoIniOptionsObject = options;
    memoFinishedObject = Object.entries(participantObject).filter((participant) =>
      Object.entries(options.filter).every(([key, value]) => participant?.[1]?.[key] === value)
    );
    return memoFinishedObject;
  };
})();

const fixNumber = (number, options = {}) => {
  const { fixDigit = 2 } = options;
  const nPowerOf10 = 10 ** fixDigit;
  return Math.round((number + Number.EPSILON) * nPowerOf10) / nPowerOf10;
};
export { filterParticipants, fixNumber };
