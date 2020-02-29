import { isUndefined, isInstance, isString, isFunction } from "./value.js";
import { toast, clearToasts } from "./toast.js";
import { loadedStyles, removeInjectedStyles, injectStyles } from "./style.js";

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
  [Toaster.INFO]: "Info!",
  [Toaster.WARNING]: "Warning..."
};

function Toaster(o = {}, injectStyles) {
  if (!isInstance(this, Toaster)) {
    return new Toaster(o, injectStyles);
  }

  const defaults = {
    injectCss: false,
    theme: "default",
    animation: "appear",
    verifyImport: false,
  };

  this.config = { ...defaults, ...o };

  if (this.config.injectCss) {
    if (!loadedStyles()) {
      injectStyles(this.config.theme);
    }
  }
}

const useToaster = (o, inject) =>
  new Toaster(
    o,
    isFunction(inject) ? inject : injectStyles({ default: "" })
  );

const callToast = (type, message, config, o) => {
  /* if not supposed to have injected css, remove it.
   * Set by user using `options.verifyImport`.
   */
  if (config.verifyImport && !config.injectCss) {
    if (loadedStyles()) {
      removeInjectedStyles();
    }
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
  _version: Toaster.version,
  [Toaster.type]: Toaster.type,
  success,
  failure,
  info,
  warning,
  clear
});

export default useToaster();

export { useToaster };
