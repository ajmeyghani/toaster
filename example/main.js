import toaster from "/index.js";

const successButton = document.querySelector("#js-success-button");
successButton.addEventListener("click", () => {
  toaster.success("Created a toaster successfully! " + new Date().getTime(), { dismiss: "500" });
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
