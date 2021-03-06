import chroma from "chroma-js";
import {red, green} from '@ant-design/colors'

const primaryBackground = "#1890ff";
const primaryBackgroundDark = chroma(primaryBackground).darken(0.3).hex();
const primaryBackgroundLight = chroma(primaryBackground).brighten(0.4).hex();
const mark = "#C7802D";
const error = "#f50";
const white = "#FFFFFB";
const black = "#080808";
const getGray = (scale) => chroma.scale([white, black])(scale).hex();
const getbalanceColor = (balance) =>
  chroma.scale([red[2], "#fff", green[2]]).domain([-1000, 1000])(balance).hex();

const colors = {
  primaryBackground,
  primaryBackgroundDark,
  primaryBackgroundLight,
  mark,
  error,
  white,
  getGray,
  getbalanceColor
};

export default colors;
