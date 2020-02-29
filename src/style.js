const DEFAULT_STYLES_NAME = "default_ajmey_toaster";

const loadedStyles = (styleName = DEFAULT_STYLES_NAME) => {
  const styles = Array.from(document.getElementsByTagName("style"));
  return styles.find(v => v.dataset.styleName === styleName);
};

const injectStyles = themes => theme => {
  window.addEventListener("DOMContentLoaded", event => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.setAttribute("data-style-name", DEFAULT_STYLES_NAME);
    head.appendChild(style);
    style.type = "text/css";
    const selectedTheme = themes[theme] || themes["default"];
    style.appendChild(document.createTextNode(selectedTheme));
    return style;
  });
};

const removeInjectedStyles = () => {
  const styles = loadedStyles();
  styles.parentNode.removeChild(styles);
};

export {
  DEFAULT_STYLES_NAME,
  injectStyles,
  loadedStyles,
  removeInjectedStyles
};
