const filterParticipants = (
  participantObject,
  options = {
    filter: { targeted: true },
  }
) =>
  Object.entries(participantObject).filter((participant) =>
    Object.entries(options.filter).every(([key, value]) => participant?.[1]?.[key] === value)
  );

export { filterParticipants };
