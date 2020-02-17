import defaultStyles from "./default-styles.js";
import { isString, isPlainObject } from "./value.js";

const DEFAULT_STYLES_NAME = "default_ajmey_toaster";
const DEFAULT_DISMISS_AFTER = 1500;
const TYPES = {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info"
};
let dismissTimeout;

const _addDefaultStyles = () => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.setAttribute("data-style-name", DEFAULT_STYLES_NAME);
  head.appendChild(style);
  style.type = "text/css";
  style.appendChild(document.createTextNode(defaultStyles));
};

const clear = () => {
  const toasters = Array.from(
    document.getElementsByClassName("js-ajmey-toaster")
  );

  const dismissButtons = Array.from(
    document.querySelectorAll(".ajmey-toaster__dismiss")
  );

  if (dismissButtons.length) {
    for (const b of dismissButtons) {
      b.removeEventListener("click", clear);
    }
  }

  for (const t of toasters) {
    if (t.parentNode) {
      t.parentNode.removeChild(t);
    }
  }
};

const _createToaster = (message, options, type) => {
  if (!isString(message) || message === "") {
    throw new Error("Must provide message.");
  }

  if (!isString(type) || type === "") {
    throw new Error("Must provide type.");
  }

  if (!isPlainObject(options)) {
    throw new Error("Options should be a plain object.");
  }

  const validOptions = ["dismiss"];

  const isAllOptionsValid = Object.keys(options).every(o =>
    validOptions.includes(o)
  );

  if (!isAllOptionsValid) {
    throw new Error("One or more options provided is not valid.");
  }

  const titlesByType = {
    [TYPES.SUCCESS]: "Success!",
    [TYPES.FAILURE]: "Oops!",
    [TYPES.INFO]: "Info!"
  };

  if (!options.title) {
    options.title = titlesByType[type];
  }

  if (dismissTimeout) {
    window.clearTimeout(dismissTimeout);
  }

  clear();

  const fragment = new window.DocumentFragment();

  const wrapper = document.createElement("div");
  wrapper.classList.add("ajmey-toaster");
  wrapper.classList.add("js-ajmey-toaster");

  const toasterTemplate = `
  <div class="ajmey-toaster__inner --${type}">
    <p class="ajmey-toaster__title">${options.title}</p>
    <p class="ajmey-toaster__message">${message}</p>
    <button class="ajmey-toaster__dismiss">Dismiss</button>
  </div>
  `;

  wrapper.insertAdjacentHTML("afterbegin", toasterTemplate);
  fragment.appendChild(wrapper);
  document.body.appendChild(fragment);

  document
    .querySelector(".ajmey-toaster__dismiss")
    .addEventListener("click", clear);

  if (options.dismiss) {
    options.dismiss = Number.isInteger(options.dismiss)
      ? options.dismiss
      : DEFAULT_DISMISS_AFTER;

    dismissTimeout = window.setTimeout(clear, options.dismiss);
  }
};

const success = (message, options = {}) => {
  _createToaster(message, options, TYPES.SUCCESS);
};

const failure = (message, options = {}) => {
  _createToaster(message, options, TYPES.FAILURE);
};

const toaster = {
  success,
  failure,
  clear
};

const _init = () => {
  window.addEventListener("DOMContentLoaded", event => {
    const styles = Array.from(document.getElementsByTagName("style"));
    const isDefaultStyles = Boolean(
      styles.filter(v => v.dataset.styleName === DEFAULT_STYLES_NAME).length
    );

    if (!isDefaultStyles) {
      _addDefaultStyles();
    }
  });

  return toaster;
};

export default _init();
