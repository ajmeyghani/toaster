const DEFAULT_STYLES_NAME = "default_ajmey_toaster";

const loadedStyles = (styleName = DEFAULT_STYLES_NAME) => {
  const styles = Array.from(document.getElementsByTagName("style"));
  return styles.filter(v => v.dataset.styleName === styleName);
};

const injectStyles = function injectStyles(themes) {
  function handleInsert(theme) {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.setAttribute("data-style-name", DEFAULT_STYLES_NAME);
    head.appendChild(style);
    style.type = "text/css";
    const selectedTheme = themes[theme] || themes["default"];
    style.appendChild(document.createTextNode(selectedTheme));
    return style;
  }

  handleInsert.ajmStyleInjector = true;
  return handleInsert;
};

const removeInjectedStyles = () => {
  const styles = loadedStyles();
  for (const s of styles) {
    s.parentNode.removeChild(s);
  }
};

export {
  DEFAULT_STYLES_NAME,
  injectStyles,
  loadedStyles,
  removeInjectedStyles
};
