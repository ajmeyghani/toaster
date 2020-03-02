import { isUndefined, isString, isFunction } from "./value.js";
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
  [Toaster.INFO]: "Note!",
  [Toaster.WARNING]: "Warning!"
};

function Toaster(o = {}, injectFn) {
  if (!isFunction(injectFn) || !injectFn.ajmStyleInjector) {
    throw new Error("Provided css injector function is not valid.");
  }

  const defaults = {
    injectCss: false,
    theme: "default",
    animation: "appear",
  };

  this.config = { ...defaults, ...o };
  this.config.injectFn = injectFn;

  if (this.config.injectCss) {
    removeInjectedStyles();
    injectFn(this.config.theme);
  }
}

const useToaster = (o, injectFn) => new Toaster(o, injectFn);

const callToast = (type, message, config, o) => {
   removeInjectedStyles();
   if (config.injectCss) {
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

export default useToaster;
export { useToaster, injectStyles };
