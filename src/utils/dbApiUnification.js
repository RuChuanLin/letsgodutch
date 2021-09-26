export const snapshots2Docs = (snapshots) => (snapshots?.docs ? snapshots.docs : snapshots);
export const snapshot2Data = (snapshot) => {
  if (snapshot?.data && typeof snapshot.data === "function") {
    return snapshot.data();
  }
  return snapshot;
};

export const getIdFromAddedObject = (addedObject) => {
  if (typeof addedObject === "string") {
    return addedObject;
  }
  return addedObject?.data?.key;
};
