import { isString, isPlainObject, isBoolean, isUndefined } from "./value.js";

/*
  The way it is right now, even if imported by more than one, there will
  be ever one instance of the toaster.
*/

function newToaster() {
  let tId = 0;
  const toaster = {
    success(message) {
      console.log(message);
      return "success toast: " + message;
    }
  };

  console.log("creating toaster ", tId);

  return function instance(options) {
    console.log("count ", tId);
    // if (tId > 0) {
    //   return;
    // }

    tId += 1;
    return toaster;
  };
}


const toaster = newToaster();

export default toaster();
