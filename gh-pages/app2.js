// import t, { newToaster } from "../src/core2.js";
// const toaster = newToaster({app: "two"});
// toaster.success("app2");
// t.configure({boo: "configured", instances: 25, x: "x"});
// console.log("instance from app2",  "actual instance", t)

import toaster from "../src/core2.js";
toaster.success("2 is here", { dismiss: 1500 });

export default 2;
