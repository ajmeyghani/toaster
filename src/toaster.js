import { version } from "../package.json";
import { isUndefined, isString, isFunction, isPlainObject } from "./value.js";
import { toast, clearToasts } from "./toast.js";
import { loadedStyles, removeInjectedStyles, injectStyles } from "./style.js";
import { titles, types } from "./titles.js";

function Toaster(o = {}, injectFn) {
  if (injectFn && (!isFunction(injectFn) || !injectFn.ajmStyleInjector)) {
    throw new Error("Provided css injector function is not valid.");
  }

  const defaults = {
    theme: "default",
    animation: "appear",
  };

  this.config = { ...defaults, ...o, injectFn };

  if (injectFn) {
    removeInjectedStyles();
    injectFn(this.config.theme);
  }
}

Toaster.version = version;
Toaster.type = Symbol("#toaster");
Toaster.titles = titles;
Object.assign(Toaster, types);
Toaster.prototype.events = {};
const events = Toaster.prototype.events;

function toastMaker(type) {
  return function(message = "", o = {}) {
    if (isPlainObject(message)) {
      o = message;
    }
    return toast(type, message, { ...this.config, ...o }, events);
  };
}

function clear() {
  return clearToasts(Toaster.prototype.events);
}

function on(eventName, callback) {
  this.events[eventName] = callback;
}

const useToaster = (o, injectFn) => new Toaster(o, injectFn);

Object.assign(Toaster.prototype, {
  [Toaster.type]: Toaster.type,
  version: Toaster.version,
  success: toastMaker(Toaster.SUCCESS),
  failure: toastMaker(Toaster.FAILURE),
  info: toastMaker(Toaster.INFO),
  warning: toastMaker(Toaster.WARNING),
  clear,
  on
});

Object.freeze(Toaster.prototype);

export default useToaster;
export { useToaster, injectStyles };
