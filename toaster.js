var version = "0.5.0";

const UNDEFINED = void 0;

const isUndefined = v => v === UNDEFINED;

const isString = v => typeof v === "string";

const isPlainObject = v =>
  Object.prototype.toString.call(v) === "[object Object]";

const isFunction = v => typeof v === "function";

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

const types = {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info",
  WARNING: "warning"
};

const titles = {
  [types.SUCCESS]: "Success!",
  [types.FAILURE]: "Oops...",
  [types.INFO]: "Note!",
  [types.WARNING]: "Warning!"
};

let dismissTimeout;
const DEFAULT_DISMISS_AFTER = 1500;

const makeToastNode = (o, wrapperClass = "ajmtoaster") => {
  if (!o) {
    throw new Error("Need to pass options object.");
  }

  const fragment = new window.DocumentFragment();
  const wrapper = document.createElement("div");
  const { theme, animation, type, title, message } = o;

  wrapper.classList.add(wrapperClass);
  wrapper.classList.add(`theme-${theme}`);
  wrapper.classList.add("js-ajmtoaster");
  wrapper.classList.add(`--animation-${animation}`);

  const toasterTemplate = `
  <div class="ajmtoaster__inner --${type} theme-${theme}">
    <p class="ajmtoaster__title theme-${theme}">${title}</p>
    <p class="ajmtoaster__message theme-${theme} ${
    message ? "with-message" : ""
  }">${message}</p>
    <button class="js-ajmtoaster__dismiss ajmtoaster__dismiss theme-${theme}">&times;</button>
  </div>
  `;

  return { wrapper, toasterTemplate, fragment };
};

const insertToast = (wrapper, fragment, toasterTemplate) => {
  wrapper.insertAdjacentHTML("afterbegin", toasterTemplate);
  fragment.appendChild(wrapper);
  document.body.appendChild(fragment);
  return wrapper;
};

const toast = (type, message, options, events) => {
  if (dismissTimeout) {
    window.clearTimeout(dismissTimeout);
  }

  clearToasts();

  removeInjectedStyles();
  if (options.injectFn) {
    options.injectFn(options.theme);
  }

  if (!isString(message)) {
    message = "";
  }

  const title = options.title ? String(options.title) : titles[type];

  const { wrapper, fragment, toasterTemplate } = makeToastNode({
    ...options,
    type,
    title,
    message
  });

  insertToast(wrapper, fragment, toasterTemplate);

  const dismissButtons = Array.from(
    document.querySelectorAll(".js-ajmtoaster__dismiss")
  );

  for (const b of dismissButtons) {
    b.addEventListener("click", () => clearToasts(events));
  }

  if (type === types.SUCCESS) {
    if (
      isUndefined(options.dismiss) ||
      (!Number.isInteger(options.dismiss) && options.dismiss !== false)
    ) {
      options.dismiss = DEFAULT_DISMISS_AFTER;
    }
  } else {
    options.dismiss = Number.isInteger(options.dismiss) ? options.dismiss :
    options.dismiss === true ? DEFAULT_DISMISS_AFTER : false;
  }

  if (options.dismiss) {
    dismissTimeout = window.setTimeout(
      () => clearToasts(events),
      options.dismiss
    );
  }

  if (isFunction(events.beforeLoad)) {
    events.beforeLoad();
  }

  return new Promise(r => {
    window.setTimeout(() => {
      wrapper.classList.add("--active");
      if (isFunction(events.loaded)) {
        events.loaded();
      }
      r(wrapper);
    }, 200);
  });
};

const clearToasts = events => {
  const toasts = Array.from(document.getElementsByClassName("js-ajmtoaster"));
  let count = toasts.length;

  const dismissButtons = Array.from(
    document.querySelectorAll(".js-ajmtoaster__dismiss")
  );

  if (dismissButtons.length) {
    for (const b of dismissButtons) {
      b.removeEventListener("click", clearToasts);
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

  if (events && isFunction(events.beforeClear)) {
    events.beforeClear();
  }

  return new Promise(r => {
    window.setTimeout(() => {
      for (const t of toasts) {
        if (t.parentNode) {
          t.parentNode.removeChild(t);
        }
      }

      r(count);
      if (events && isFunction(events.cleared)) {
        events.cleared();
      }
    }, maxDuration + 100);
  });
};

function Toaster(o = {}, injectFn) {
  if (injectFn && (!isFunction(injectFn) || !injectFn.ajmStyleInjector)) {
    throw new Error("Provided css injector function is not valid.");
  }

  const defaults = {
    theme: "default",
    animation: "appear",
  };

  this.config = { ...defaults, ...o, injectFn };

  if (injectFn) {
    removeInjectedStyles();
    injectFn(this.config.theme);
  }
}

Toaster.version = version;
Toaster.type = Symbol("#toaster");
Toaster.titles = titles;
Object.assign(Toaster, types);
Toaster.prototype.events = {};
const events = Toaster.prototype.events;

function toastMaker(type) {
  return function(message = "", o = {}) {
    if (isPlainObject(message)) {
      o = message;
    }
    return toast(type, message, { ...this.config, ...o }, events);
  };
}

function clear() {
  return clearToasts(Toaster.prototype.events);
}

function on(eventName, callback) {
  this.events[eventName] = callback;
}

const useToaster = (o, injectFn) => new Toaster(o, injectFn);

Object.assign(Toaster.prototype, {
  [Toaster.type]: Toaster.type,
  version: Toaster.version,
  success: toastMaker(Toaster.SUCCESS),
  failure: toastMaker(Toaster.FAILURE),
  info: toastMaker(Toaster.INFO),
  warning: toastMaker(Toaster.WARNING),
  clear,
  on
});

Object.freeze(Toaster.prototype);

export default useToaster;
export { injectStyles, useToaster };
//# sourceMappingURL=toaster.js.map
