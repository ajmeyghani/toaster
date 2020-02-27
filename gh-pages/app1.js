// import t, { newToaster } from "../src/core2.js";
// const toaster = newToaster({app: "one"});
// toaster.success("loggin success: app1");
// console.log("instance from app1",  "actual instance", t)

// import toaster from "../src/core2.js";
// toaster.success("app 1 is here", { dismiss: 1500 });

import toaster from "../src/core2.js";
window.toaster = toaster;
toaster.success();
console.log(toaster)

export default 1;
