const baseStyles = `
.ajmtoaster,
.ajmtoaster__inner,
.ajmtoaster__title,
.ajmtoaster__message,
.ajmtoaster__dismiss {
  box-sizing: border-box;
}

.ajmtoaster {
  position: fixed;
  width: 325px;
  top: 10px;
  right: 10px;
  z-index: 999999;
}

.ajmtoaster.--animation-appear,
.ajmtoaster.--animation-appear.--active {
    transition: transform var(--ajmt-duration) var(--ajmt-easing) 0ms,
    opacity var(--ajmt-duration) var(--ajmt-easing) 50ms;
}

.ajmtoaster.--animation-appear {
  opacity: 0;
  transform: scale(1.1);
}

.ajmtoaster.--animation-appear.--active {
  opacity: 1;
  transform: scale(1);
}


.ajmtoaster.--animation-slide-down,
.ajmtoaster.--animation-slide-down.--active {
    transition: transform var(--ajmt-duration) var(--ajmt-easing) 0ms,
    opacity var(--ajmt-duration) var(--ajmt-easing) 50ms;
}

.ajmtoaster.--animation-slide-down {
  opacity: 0;
  transform: translateY(-20px);
}

.ajmtoaster.--animation-slide-down.--active {
  opacity: 1;
  transform: translateY(0);
}

.ajmtoaster__inner {
  min-height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 16px;
  font-family: "Roboto", sans-serif;
  font-weight: 100;

  padding: 15px 26px 15px 15px;
  border-radius: 3px;
}

.ajmtoaster__inner.--success {
  background: var(--ajmt-success);
}

.ajmtoaster__inner.--failure {
  background: var(--ajmt-failure);
}

.ajmtoaster__inner.--warning {
  background: var(--ajmt-warning);
}

.ajmtoaster__inner.--info {
  background: var(--ajmt-info);
}

.ajmtoaster__inner {
  color: var(--ajmt-white);
}

.ajmtoaster__title,
.ajmtoaster__message,
.ajmtoaster__dismiss {
  margin: 0;
  padding: 0;
}

.ajmtoaster__title {
  line-height: 1.1;
  font-weight: 400;
}

.ajmtoaster__message {
  line-height: 1.3;
}

.ajmtoaster__message {
  max-width: 100%;
  max-height: 100px;
  overflow: auto;
  margin-top: 0;

  font-size: 80%;
  word-break: break-word;
}

.ajmtoaster__message.with-message {
  margin-top: 10px;
  margin-right: 10px;
}

.ajmtoaster__dismiss {
  box-sizing: border-box;
  border: none;
  color: rgba(255, 255, 255, 0.81);
  line-height: 1;
  margin: 0;
  height: 100%;
  display: block;
  font-weight: 100;
  border-radius: 0;
  min-height: 0;
  padding: 0;
  font-family: sans-serif;
  padding: 0 8px;
  font-size: 16px;

  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.ajmtoaster__dismiss,
.ajmtoaster__dismiss:hover {
  transition: background-color 200ms ease-in-out;
}

.ajmtoaster__dismiss {
  background-color: rgba(0, 0, 0, 0.08);
}

.ajmtoaster__dismiss:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.07);
}

.ajmtoaster__dismiss:active {
  background-color: rgba(0, 0, 0, 0.08);
}

.ajmtoaster__dismiss:focus {
  outline: 0;
}
`;

const themeDefault = `
.ajmtoaster,
.ajmtoaster.theme-default {
  --ajmt-white: #fff;
  --ajmt-success: #41d888;
  --ajmt-failure: #f94416;
  --ajmt-info: #0387d7;
  --ajmt-warning: #ffbd02;
  --ajmt-duration: 300ms;
  --ajmt-easing: ease-in-out;
}
`;

const darkTheme = `
.ajmtoaster,
.ajmtoaster.theme-default,
.ajmtoaster.theme-dark {
  --ajmt-white: #f6f6f6;
  --ajmt-success: #032503;
  --ajmt-failure: #6f1010;
  --ajmt-warning: #795615;
  --ajmt-info: #191977;
  --ajmt-duration: 300ms;
  --ajmt-easing: ease-in-out;
}
`;

const themes = {
  baseCss: baseStyles,
  dark: darkTheme + baseStyles,
  default: themeDefault + baseStyles
};

const UNDEFINED = void 0;

const isUndefined = v => v === UNDEFINED;

const isString = v => typeof v === "string";

const isFunction = v => typeof v === "function";

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

const toast = o => {
  if (dismissTimeout) {
    window.clearTimeout(dismissTimeout);
  }

  clearToasts();

  const { wrapper, fragment, toasterTemplate } = makeToastNode(o);
  insertToast(wrapper, fragment, toasterTemplate);

  const dismissButtons = Array.from(
    document.querySelectorAll(".js-ajmtoaster__dismiss")
  );

  for (const b of dismissButtons) {
    b.addEventListener("click", clearToasts);
  }

  if (o.dismiss) {
    o.dismiss = Number.isInteger(o.dismiss) ? o.dismiss : DEFAULT_DISMISS_AFTER;
    dismissTimeout = window.setTimeout(clearToasts, o.dismiss);
  }

  return new Promise(r => {
    window.setTimeout(() => {
      wrapper.classList.add("--active");
      r(wrapper);
    }, 200);
  });
};

const clearToasts = () => {
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

  return new Promise(r => {
    window.setTimeout(() => {
      for (const t of toasts) {
        if (t.parentNode) {
          t.parentNode.removeChild(t);
        }
      }

      r(count);
    }, maxDuration + 100);
  });
};

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

Toaster.type = Symbol("#toaster");
Toaster.version = "1.0.0";

Object.assign(Toaster, {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info",
  WARNING: "warning"
});

Toaster.titles = {
  [Toaster.SUCCESS]: "Success!",
  [Toaster.FAILURE]: "Oops...",
  [Toaster.INFO]: "Note!",
  [Toaster.WARNING]: "Warning!"
};

function Toaster(o = {}, injectFn) {
  if (injectFn && (!isFunction(injectFn) || !injectFn.ajmStyleInjector)) {
    throw new Error("Provided css injector function is not valid.");
  }

  const defaults = {
    theme: "default",
    animation: "appear",
  };

  this.config = { ...defaults, ...o };
  this.config.injectFn = injectFn;

  if (this.config.injectFn) {
    removeInjectedStyles();
    injectFn(this.config.theme);
  }
}

const useToaster = (o, injectFn) => new Toaster(o, injectFn);

const callToast = (type, message, config, o) => {
   removeInjectedStyles();
   if (config.injectFn) {
    config.injectFn(config.theme);
   }

  if (!isString(message)) {
    message = "";
  }

  let dismiss = false;
  const title = o.title ? String(o.title) : Toaster.titles[type];

  if (type === Toaster.SUCCESS) {
    dismiss = isUndefined(o.dismiss) ? true : o.dismiss;
  } else {
    dismiss = o.dismiss;
  }

  return toast({
    ...config,
    ...o,
    type,
    title,
    message,
    dismiss,
  });
};

function success(message = "", o = {}) {
  return callToast(Toaster.SUCCESS, message, this.config, o);
}

function failure(message = "", o = {}) {
  return callToast(Toaster.FAILURE, message, this.config, o);
}

function info(message = "", o = {}) {
  return callToast(Toaster.INFO, message, this.config, o);
}

function warning(message = "", o = {}) {
  return callToast(Toaster.WARNING, message, this.config, o);
}

function clear() {
  return clearToasts();
}

Object.assign(Toaster.prototype, {
  _version: Toaster.version,
  [Toaster.type]: Toaster.type,
  success,
  failure,
  info,
  warning,
  clear
});

const toaster = useToaster(
  { animation: "slide-down", theme: "default" },
  injectStyles(themes)
);

export default toaster;
export { themes, useToaster };
