import { version } from "../package.json";
import { isUndefined, isString, isFunction } from "./value.js";
import { toast, clearToasts } from "./toast.js";
import { loadedStyles, removeInjectedStyles, injectStyles } from "./style.js";

Toaster.type = Symbol("#toaster");
Toaster.version = version;

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
    animation: "appear"
  };

  this.config = { ...defaults, ...o };
  this.config.injectFn = injectFn;

  if (this.config.injectFn) {
    removeInjectedStyles();
    injectFn(this.config.theme);
  }
}

const useToaster = (o, injectFn) => new Toaster(o, injectFn);

const callToast = (type, message, config, events) => {
  removeInjectedStyles();
  if (config.injectFn) {
    config.injectFn(config.theme);
  }

  if (!isString(message)) {
    message = "";
  }

  let dismiss = false;
  const title = config.title ? String(config.title) : Toaster.titles[type];

  if (type === Toaster.SUCCESS) {
    dismiss = isUndefined(config.dismiss) ? true : config.dismiss;
  } else {
    dismiss = config.dismiss;
  }

  return toast({
    ...config,
    type,
    title,
    message,
    dismiss
  }, events);
};

Toaster.prototype.events = {};

const events = Toaster.prototype.events;

function success(message = "", o = {}) {
  return callToast(Toaster.SUCCESS, message, {...this.config, ...o}, events);
}

function failure(message = "", o = {}) {
  return callToast(Toaster.FAILURE, message, {...this.config, ...o}, events);
}

function info(message = "", o = {}) {
  return callToast(Toaster.INFO, message, {...this.config, ...o}, events);
}

function warning(message = "", o = {}) {
  return callToast(Toaster.WARNING, message, {...this.config, ...o}, events);
}

function clear() {
  return clearToasts(Toaster.prototype.events);
}

function on(eventName, callback) {
  this.events[eventName] = callback;
}

Object.assign(Toaster.prototype, {
  [Toaster.type]: Toaster.type,
  version: Toaster.version,
  success,
  failure,
  info,
  warning,
  clear,
  on
});

Object.freeze(Toaster.prototype);

export default useToaster;
export { useToaster, injectStyles };
