import { isFunction, isUndefined, isString, isBoolean } from "./value.js";
import { removeInjectedStyles } from "./style.js";
import { titles, types } from "./titles.js";

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
    options.dismiss === true ? DEFAULT_DISMISS_AFTER : false
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

export { toast, clearToasts };
