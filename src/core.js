import { isString, isPlainObject, isBoolean, isUndefined } from "./value.js";

const DEFAULT_DISMISS_AFTER = 1500;
const validOptions = ["dismiss", "title"];
const TYPES = {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info",
  WARNING: "warning"
};

let dismissTimeout;

const clear = () => {
  const toasts = Array.from(document.getElementsByClassName("js-ajmtoaster"));

  const dismissButtons = Array.from(
    document.querySelectorAll(".js-ajmtoaster__dismiss")
  );

  if (dismissButtons.length) {
    for (const b of dismissButtons) {
      b.removeEventListener("click", clear);
    }
  }

  for (const t of toasts) {
    t.classList.remove("--active");
  }

  const durations = toasts.map(t =>
    Number.parseFloat(
      window.getComputedStyle(t).getPropertyValue("--ajmt-duration")
    )
  );

  const maxDuration = window.Math.max(...durations);

  window.setTimeout(() => {
    for (const t of toasts) {
      if (t.parentNode) {
        t.parentNode.removeChild(t);
      }
    }
  }, maxDuration + 100);
};

const _isValidOptions = options => {
  return (
    isPlainObject(options) &&
    Object.keys(options).every(o => validOptions.includes(o))
  );
};

const _makeToast = (message = "", config, type, theme, animation) => {
  const titlesByType = {
    [TYPES.SUCCESS]: "Success!",
    [TYPES.FAILURE]: "Oops...",
    [TYPES.INFO]: "Info!",
    [TYPES.WARNING]: "Warning..."
  };

  const defaults = {
    title: titlesByType[type],
    dismiss: false
  };

  const options = { ...defaults, ...config };

  if (!options.title) {
    options.title = defaults.title;
  }

  if (!isString(message)) {
    throw new Error(
      `Expected message to be a string but received ${typeof message}.`
    );
  }

  if (!Object.values(TYPES).some(v => v === type)) {
    throw new Error(`Type should be one of ${Object.values(TYPES)}`);
  }

  if (!_isValidOptions(config)) {
    throw new Error(
      "Provided options object is not valid. Valid options are:\n" +
        Object.values(validOptions).map(opt => `options.${opt}`) +
        "\n" +
        "Please see the docs for more information."
    );
  }

  if (dismissTimeout) {
    window.clearTimeout(dismissTimeout);
  }

  clear();

  const fragment = new window.DocumentFragment();

  const wrapper = document.createElement("div");
  wrapper.classList.add("ajmtoaster");
  wrapper.classList.add(`theme-${theme}`);
  wrapper.classList.add("js-ajmtoaster");
  wrapper.classList.add(`--animation-${animation}`);

  const toasterTemplate = `
  <div class="ajmtoaster__inner --${type} theme-${theme}">
    <p class="ajmtoaster__title theme-${theme}">${options.title}</p>
    <p class="ajmtoaster__message theme-${theme} ${
    message ? "with-message" : ""
  }">${message}</p>
    <button class="js-ajmtoaster__dismiss ajmtoaster__dismiss theme-${theme}">&times;</button>
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

  return wrapper;
};

const newToaster = (opt = {}) => {
  const defaults = { theme: "defaults", animation: "appear" };
  const { theme, animation } = { ...defaults, ...opt };

  return {
    success: (message, config = {}) => {
      return _makeToast(
        message,
        {
          ...config,
          dismiss: isUndefined(config.dismiss) ? true : config.dismiss
        },
        TYPES.SUCCESS,
        theme,
        animation
      );
    },
    failure: (message, config = {}) =>
      _makeToast(message, config, TYPES.FAILURE, theme, animation),
    info: (message, config = {}) =>
      _makeToast(message, config, TYPES.INFO, theme, animation),
    warning: (message, config = {}) =>
      _makeToast(message, config, TYPES.WARNING, theme, animation),
    clear
  };
};

export default newToaster;
