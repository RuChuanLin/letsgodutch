import chroma from "chroma-js";

const primaryBackground = "#33A6B8";
const primaryBackgroundDark = chroma(primaryBackground).darken(0.3).hex();
const primaryBackgroundLight = chroma(primaryBackground).brighten(0.4).hex();
const white = "#FFFFFB";
const black = "#080808";
const getGray = (scale) => {
  const gray = chroma.scale([white, black])(scale).hex();
  console.log(gray);
  return gray;
};

export const colors = {
  primaryBackground,
  primaryBackgroundDark,
  primaryBackgroundLight,
  white,
  secondaryBackgroundColor: "#81C7D4",
  getGray,
};