const filterParticipants = (
  participantObject,
  options = {
    filter: { targeted: true },
  }
) =>
  Object.entries(participantObject).filter((participant) =>
    Object.entries(options.filter).every(([key, value]) => participant?.[1]?.[key] === value)
  );

const fixNumber = (number, options = {}) => {
  const { fixDigit = 2 } = options;
  const nPowerOf10 = 10 ** fixDigit;
  return Math.round((number + Number.EPSILON) * nPowerOf10) / nPowerOf10;
};
export { filterParticipants, fixNumber };
