import themes from "./themes.js";
import { isString, isPlainObject, isBoolean } from "./value.js";

const DEFAULT_STYLES_NAME = "default_ajmey_toaster";
const DEFAULT_DISMISS_AFTER = 1500;
const TYPES = {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info",
  WARNING: "warning"
};

let dismissTimeout;

const _addDefaultStyles = theme => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.setAttribute("data-style-name", DEFAULT_STYLES_NAME);
  head.appendChild(style);
  style.type = "text/css";
  const selectedTheme = themes[theme] ? themes[theme] : themes["default"];
  style.appendChild(document.createTextNode(selectedTheme));
};

const clear = () => {
  const toasters = Array.from(document.getElementsByClassName("js-ajmtoaster"));

  const dismissButtons = Array.from(
    document.querySelectorAll(".js-ajmtoaster__dismiss")
  );

  if (dismissButtons.length) {
    for (const b of dismissButtons) {
      b.removeEventListener("click", clear);
    }
  }

  for (const t of toasters) {
    t.classList.remove("--active");
  }

  const durations = toasters.map(t =>
    Number.parseFloat(
      window.getComputedStyle(t).getPropertyValue("--ajmt-duration")
    )
  );

  const maxDuration = window.Math.max(...durations);

  window.setTimeout(() => {
    for (const t of toasters) {
      if (t.parentNode) {
        t.parentNode.removeChild(t);
      }
    }
  }, maxDuration + 100);
};

const _isValidOptions = options => {
  const validOptions = ["dismiss", "title", "theme"];
  return (
    isPlainObject(options) &&
    Object.keys(options).every(o => validOptions.includes(o))
  );
};

const _createToaster = (message = "", options = {}, type) => {
  if (!isString(type) || type === "") {
    throw new Error("Must provide type as a string.");
  }

  if (!isString(message)) {
    throw new Error("Expected message to be a string.");
  }

  if (isBoolean(options) && options === true) {
    options = {
      dismiss: DEFAULT_DISMISS_AFTER
    };
  } else if (!_isValidOptions(options)) {
    throw new Error("Options provided is not valid.");
  }

  const titlesByType = {
    [TYPES.SUCCESS]: "Success!",
    [TYPES.FAILURE]: "Oops...",
    [TYPES.INFO]: "Info!",
    [TYPES.WARNING]: "Warning..."
  };

  if (!options.title) {
    options.title = titlesByType[type];
  }

  if (!options.theme) {
    options.theme = "default";
  }

  if (dismissTimeout) {
    window.clearTimeout(dismissTimeout);
  }

  clear();

  const fragment = new window.DocumentFragment();

  const wrapper = document.createElement("div");
  wrapper.classList.add("ajmtoaster");
  wrapper.classList.add(`theme-${options.theme}`);
  wrapper.classList.add("js-ajmtoaster");

  const toasterTemplate = `
  <div class="ajmtoaster__inner --${type} theme-${options.theme}">
    <p class="ajmtoaster__title theme-${options.theme}">${options.title}</p>
    <p class="ajmtoaster__message theme-${options.theme} ${
    message ? "with-message" : ""
  }">${message}</p>
    <button class="js-ajmtoaster__dismiss ajmtoaster__dismiss theme-${
      options.theme
    }">&times;</button>
  </div>
  `;

  wrapper.insertAdjacentHTML("afterbegin", toasterTemplate);
  fragment.appendChild(wrapper);
  document.body.appendChild(fragment);
  window.setTimeout(() => {
    wrapper.classList.add("--active");
  }, 200);

  const dismissButtons = Array.from(
    document.querySelectorAll(".js-ajmtoaster__dismiss")
  );
  for (const b of dismissButtons) {
    b.addEventListener("click", clear);
  }

  if (options.dismiss) {
    options.dismiss = Number.isInteger(options.dismiss)
      ? options.dismiss
      : DEFAULT_DISMISS_AFTER;

    dismissTimeout = window.setTimeout(clear, options.dismiss);
  }
};

const success = theme => (message, options) => {
  _createToaster(message, { ...options, theme }, TYPES.SUCCESS);
};

const failure = theme => (message, options) => {
  _createToaster(message, { ...options, theme }, TYPES.FAILURE);
};

const info = theme => (message, options) => {
  _createToaster(message, { ...options, theme }, TYPES.INFO);
};

const warning = theme => (message, options) => {
  _createToaster(message, { ...options, theme }, TYPES.WARNING);
};

const _themeToaster = theme => {
  const toaster = {
    success: success(theme),
    failure: failure(theme),
    info: info(theme),
    warning: warning(theme),
    clear: clear
  };
  return toaster;
};

const useToaster = (config = {}) => {
  const defaults = { injectCss: true, theme: "default" };
  const options = Object.assign(defaults, config);
  if (options.injectCss) {
    window.addEventListener("DOMContentLoaded", event => {
      const styles = Array.from(document.getElementsByTagName("style"));
      const isDefaultStyles = Boolean(
        styles.filter(v => v.dataset.styleName === DEFAULT_STYLES_NAME).length
      );

      if (!isDefaultStyles) {
        _addDefaultStyles(options.theme);
      }
    });
  }

  return _themeToaster(options.theme);
};

export default _themeToaster("default");

export { useToaster };
