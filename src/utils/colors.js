import chroma from "chroma-js";

const primaryBackground = "#1890ff";
const primaryBackgroundDark = chroma(primaryBackground).darken(0.3).hex();
const primaryBackgroundLight = chroma(primaryBackground).brighten(0.4).hex();
const mark = "#C7802D";
const error = "#f50";
const white = "#FFFFFB";
const black = "#080808";
const getGray = (scale) => chroma.scale([white, black])(scale).hex();

const colors = {
  primaryBackground,
  primaryBackgroundDark,
  primaryBackgroundLight,
  mark,
  error,
  white,
  getGray,
};

export default colors;