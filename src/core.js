import { isString, isPlainObject, isBoolean, isUndefined } from "./value.js";

const DEFAULT_DISMISS_AFTER = 1500;
const validOptions = ["dismiss", "title", "onMount"];
const _isValidOptions = options => {
  return (
    isPlainObject(options) &&
    Object.keys(options).every(o => validOptions.includes(o))
  );
};

const TYPES = {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info",
  WARNING: "warning"
};

let dismissTimeout;
const wrappers = [];

const clear = toaster => {
  const toasts = Array.from(document.getElementsByClassName("js-ajmtoaster"));
  let count = toasts.length;

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

  return new Promise((r, j) => {
    window.setTimeout(() => {
      for (const t of toasts) {
        if (t.parentNode) {
          t.parentNode.removeChild(t);
        }
      }

      r(count);
      wrappers.length = 0;
    }, maxDuration + 100);
  });
};

const _makeToast = (message = "", config, type, theme, animation, toaster) => {
  const titlesByType = {
    [TYPES.SUCCESS]: "Success!",
    [TYPES.FAILURE]: "Oops...",
    [TYPES.INFO]: "Info!",
    [TYPES.WARNING]: "Warning..."
  };

  const defaults = {
    title: titlesByType[type],
    dismiss: false,
    onMount: () => "onMounted event"
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

  wrappers.push(wrapper);
  // var event = new Event('onMount');
  // wrapper.addEventListener("onMount", options.onMount);
  // wrapper.dispatchEvent(event);

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

  return new Promise(r => {
    window.setTimeout(() => {
      wrapper.classList.add("--active");
      r(wrapper);
    }, 200);
  });
};

const newToaster = (opt = {}) => {
  const defaults = { theme: "defaults", animation: "appear" };
  const options = Object.assign(defaults, opt);

  const toaster = {
    options,
    success: (message, config = {}) => {
      return _makeToast(
        message,
        {
          ...config,
          dismiss: isUndefined(config.dismiss) ? true : config.dismiss
        },
        TYPES.SUCCESS,
        options.theme,
        options.animation,
        toaster
      );
    },
    failure: (message, config = {}) =>
      _makeToast(
        message,
        config,
        TYPES.FAILURE,
        options.theme,
        options.animation
      ),
    info: (message, config = {}) =>
      _makeToast(message, config, TYPES.INFO, options.theme, options.animation),
    warning: (message, config = {}) =>
      _makeToast(
        message,
        config,
        TYPES.WARNING,
        options.theme,
        options.animation
      )
  };

  toaster.clear = () => clear(toaster);

  return toaster;
};

export default newToaster;
