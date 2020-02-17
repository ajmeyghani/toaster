import defaultStyles from "./default-styles.js";

const DEFAULT_STYLES_NAME = "default_ajmey_toaster";

const _addDefaultStyles = () => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.setAttribute("data-style-name", DEFAULT_STYLES_NAME);
  head.appendChild(style);
  style.type = "text/css";
  style.appendChild(document.createTextNode(defaultStyles));
};

const _createToaster = (title, message, options) => {
  const fragment = new window.DocumentFragment();

  const wrapper = document.createElement("div");
  wrapper.classList.add("ajmey-toaster");
  wrapper.classList.add("js-ajmey-toaster");

  const toasterTemplate = `
  <div class="ajmey-toaster__inner --${options.type || "default"}">
    <p class="ajmey-toaster__title">${title}</p>
    <p class="ajmey-toaster__message">${message}</p>
  </div>
  `;

  wrapper.insertAdjacentHTML("afterbegin", toasterTemplate);
  fragment.appendChild(wrapper);
  document.body.appendChild(fragment);
};

const success = (title = "Success!", message, options) => {
  _createToaster(title, message, { ...options, type: "success" });
  console.log("created toaster");
};

const failure = (title = "Failure", message, options) => {
  _createToaster(title, message, { ...options, type: "failure" });
  console.log("failure toast");
};

const clear = () => {
  const toasters = Array.from(
    document.getElementsByClassName("js-ajmey-toaster")
  );
  for (const t of toasters) {
    if (t.parentNode) {
      t.parentNode.removeChild(t);
    }
  }
};

const toaster = {
  success,
  failure,
  clear
};

const _init = () => {
  const styles = Array.from(document.getElementsByTagName("style"));
  const isDefaultStyles = Boolean(
    styles.filter(v => v.dataset.styleName === DEFAULT_STYLES_NAME).length
  );

  if (!isDefaultStyles) {
    _addDefaultStyles();
  }

  return toaster;
};

export default _init();
