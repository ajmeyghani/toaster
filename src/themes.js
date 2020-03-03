import baseCss from "./base.css";
import themeDefault from "./default.css";
import themeDark from "./dark.css";

const themes = {
  baseCss: baseCss,
  dark: themeDark + baseCss,
  default: themeDefault + baseCss
};

export default themes;
export { baseCss, themeDefault, themeDark };
