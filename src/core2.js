import { isString, isPlainObject, isBoolean, isUndefined } from "./value.js";

/*
  Idea: use a closure to keep track of toasters created. We only want to keep
  one reference, so when an application uses a toaster from multiple files,
  there is always going to be one ref.
*/

function newToaster() {
  let tId = 0;
  const toaster = {
    success(message) {
      return "success toast: " + message;
    }
  };

  console.log("creating toaster ", tId);

  return function instance(options) {
    console.log("count ", tId);
    if (tId > 0) {
      return;
    }

    tId += 1;
    return toaster;
  };
}

const newToaster = (message) => "toast: " + message;

const toaster = {
  success(message) {
    return "success" + message;
  }
};

export default toaster;

export {
  newToaster
}
