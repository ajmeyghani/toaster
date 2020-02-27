const makeToast = (o, wrapperClass = "ajmtoaster") => {
  if (!o) {
    throw new Error("Need to pass {type, title, theme, animation, message}");
  }

  const fragment = new window.DocumentFragment();
  const wrapper = document.createElement("div");
  const {theme, animation, type, title, message} = o;

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

const toast = (o) => {
  const {wrapper, fragment, toasterTemplate} = makeToast(o);
  insertToast(wrapper, fragment, toasterTemplate);
  return wrapper;
};

export default toast;
