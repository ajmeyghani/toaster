import { isString, isPlainObject, isBoolean, isUndefined } from "./value.js";

/*
  The way it is right now, even if imported by more than one, there will
  be ever one instance of the toaster.
*/

function _new(newOptions) {
  let instances = 0;
  const toaster = { instances };
  const toast = options => (message, toasterOptions) =>
    console.log("toast...", options, "message: ", message, "toaster options: ", toasterOptions);

  console.log("creating toaster #", instances);

  const configure = t => {
    const cannotOverride = [
      "instances",
      "configure",
      "success",
      "failure",
      "info",
      "warning",
      "clear"
    ];
    for (const p of cannotOverride) {
      if (p in t) {
        delete t[p];
      }
    }
    console.log("configuring now ...", t);
    Object.assign(toaster, t);
    return toaster;
  };

  toaster.configure = configure;

  return function instance(options) {
    instances += 1;

    console.log(
      "count inner % ",
      instances,
      "new options: ",
      newOptions,
      "options: ",
      options
    );

    if (isUndefined(options.canOverride)) {
      options.canOverride = false;
    }

    const isOneInstance = 1 === instances;

    if (options.canOverride || isOneInstance) {
      console.log("defining instance methods....");
      Object.assign(toaster, {
        success: toast(options)
      });
    }

    toaster.instances = instances;

    // if (options.canOverride || isOneInstance) {
    //   console.log("setting instance methods");
    //   Object.assign(toaster, {
    //     instances: instances,
    //     success: toast(options)
    //   })
    // }

    return toaster;
  };
}

const newToaster = _new();
const internal = newToaster({ internal: true });
internal.success("success: internal call...");
// console.log(internal);

const removeInjectedCss = () => console.log("remove css ... ");

const useToaster = config => {
  if (!isUndefined(config)) {
    if (internal.instances > 2) {
      throw new Error(
        "You have already created a toaster. Get your toaster with:\n" +
          `import toaster from "@ajmey/toaster" or \n` +
          `import {useToaster} from "@ajmey/toaster"\n` +
          `const toaster = useToaster()`
      );
    }
    if ("injectCss" in config && !config.injectCss) {
      removeInjectedCss();
    }
    return newToaster({ ...config, canOverride: true });
  }
  return internal;
};

export default internal;

export { useToaster };
