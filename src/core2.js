import { isUndefined, isInstance, isString } from "./value.js";
import { toast, clearToasts } from "./dom.js";
import { loadedStyles, injectStyles } from "./style.js";

/*TODO
  The main file has already injected, if they dont mention injectCSS we should
  assume false. If a toaster is created and injectCSS is false, the later code
  will override, and it will remove injected code. So absence of injectCss means
  no css will be injected to the document.
*/

Toaster.symbol = Symbol("#toaster");
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
  [Toaster.INFO]: "Info!",
  [Toaster.WARNING]: "Warning..."
};

function Toaster(o) {
  if (!isInstance(this, Toaster)) {
    return new Toaster(o);
  }

  const defaults = {
    injectCss: false,
    theme: "default",
    animation: "appear"
  };

  this.config = { ...defaults, ...o };

  if (this.config.injectCss) {
    if (!loadedStyles()) {
      injectStyles(this.config.theme);
    }
  }
}

const callToast = (type, message, config, o) => {
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
    type,
    title,
    message,
    dismiss
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
  _symbol: Toaster.symbol,
  _version: Toaster.version,
  success,
  failure,
  info,
  warning,
  clear
});

export default Toaster({ theme: "default", injectCss: true });

export { Toaster, Toaster as useToaster /* alias */ };
