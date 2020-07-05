import baseCss from "./base.css";
import animations from "./animations.css";
import themeDefault from "./default.css";

const themes = {
  animations,
  baseCss,
  default: themeDefault + animations + baseCss
};

export default themes;
export { baseCss, animations, themeDefault };
