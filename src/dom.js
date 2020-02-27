let dismissTimeout;
const DEFAULT_DISMISS_AFTER = 1500;

const makeToastNode = (o, wrapperClass = "ajmtoaster") => {
  if (!o) {
    throw new Error("Need to pass {type, title, theme, animation, message}");
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

  return new Promise((r, j) => {
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

export { toast, clearToasts };
