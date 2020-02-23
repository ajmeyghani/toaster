import themes from "./themes.js";
import newToaster from "./core.js";

const DEFAULT_STYLES_NAME = "default_ajmey_toaster";

const _injectCss = theme => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.setAttribute("data-style-name", DEFAULT_STYLES_NAME);
  head.appendChild(style);
  style.type = "text/css";
  const selectedTheme = themes[theme] || themes["default"];
  style.appendChild(document.createTextNode(selectedTheme));
};

const useToaster = (config = {}) => {
  const defaults = { injectCss: true, theme: "default", animation: "appear" };
  const options = Object.assign(defaults, config);

  if (options.injectCss) {
    window.addEventListener("DOMContentLoaded", event => {
      const styles = Array.from(document.getElementsByTagName("style"));
      const isDefaultStyles = Boolean(
        styles.filter(v => v.dataset.styleName === DEFAULT_STYLES_NAME).length
      );

      if (!isDefaultStyles) {
        _injectCss(options.theme);
      }
    });
  }

  return newToaster({ theme: options.theme, animation: options.animation });
};

export { useToaster };
