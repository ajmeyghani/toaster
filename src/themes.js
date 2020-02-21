import baseCss from "./base-css.js";
import themeDefault from "./theme-default.js";
import themeDark from "./theme-dark.js";

const themes = {
  dark: themeDark + baseCss,
  default: themeDefault + baseCss,
};

export default themes;
