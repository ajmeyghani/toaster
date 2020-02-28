import { isUndefined, isInstance, isString } from "./value.js";
import { toast, clearToasts } from "./toast.js";
import { loadedStyles, injectStyles, removeInjectedStyles } from "./style.js";

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

function Toaster(o, isUseToaster) {
  if (!isInstance(this, Toaster)) {
    return new Toaster(o, isUseToaster);
  }

  const defaults = {
    injectCss: false,
    theme: "default",
    animation: "appear"
  };

  this.config = { ...defaults, ...o, isUseToaster };

  if (this.config.injectCss) {
    if (!loadedStyles()) {
      injectStyles(this.config.theme);
    }
  }
}

const useToaster = o => new Toaster(o, true);

const callToast = (type, message, config, o) => {
  if (config.isUseToaster && !config.injectCss) {
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

export default new Toaster({ theme: "default", injectCss: true });

export { useToaster, Toaster };
