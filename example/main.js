import toaster from "/index.js";

const toastButton1 = document.querySelector("#js-toast-button");
toastButton1.addEventListener("click", () => {
  toaster.success("hello world", "inner message");
});

const clearButton = document.querySelector("#js-clear-button");
clearButton.addEventListener("click", () => {
  toaster.clear();
});

console.log(toaster);
