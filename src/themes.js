import baseCss from "./base.css";
import animations from "./animations.css";
import themeDefault from "./default.css";
import themeDark from "./dark.css";

const themes = {
  animations,
  baseCss,
  dark: themeDark + baseCss,
  default: themeDefault + baseCss
};

export default themes;
export { baseCss, animations, themeDefault, themeDark };
