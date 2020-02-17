import toaster from "/index.js";

const successButton = document.querySelector("#js-success-button");
successButton.addEventListener("click", () => {
  toaster.success("Created successfully.", { dismiss: 500, title: "hello" });
});

const successButton2 = document.querySelector("#js-success-button2");
successButton2.addEventListener("click", () => {
  toaster.success();
});

const successButton3 = document.querySelector("#js-success-button3");
successButton3.addEventListener("click", () => {
  toaster.success("nice!", true);
});

const successButton4 = document.querySelector("#js-success-button4");
successButton4.addEventListener("click", () => {
  toaster.success({ dismiss: 1500 });
});

const failureButton = document.querySelector("#js-failure-button");
failureButton.addEventListener("click", () => {
  toaster.failure("Creatd a failure toaster " + new Date().getTime());
});

const clearButton = document.querySelector("#js-clear-button");
clearButton.addEventListener("click", () => {
  toaster.clear();
});

console.log(toaster);
