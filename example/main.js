// import toaster from "/index.js";

import { useToaster } from "/index.js";
const toaster = useToaster({theme: "default"});

const successButton = document.querySelector("#js-success-button");
successButton.addEventListener("click", () => {
  toaster.success("Created successfully.", {
    dismiss: 1e3,
    title: "Yohooooo!!"
  });
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

const failureButtonLong = document.querySelector("#js-failure-button-long");
failureButtonLong.addEventListener("click", () => {
  toaster.failure(
    "Creatd a failure toaster with a very long text Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis exercitationem mollitia est blanditiis itaque, iste quaerat velit quam quibusdam dolores autem quidem sed cupiditate, pariatur, impedit molestiae unde! Neque, id! " +
      new Date().getTime()
  );
});

const infoButton1 = document.querySelector("#js-info-button1");
infoButton1.addEventListener("click", () => {
  toaster.info("Creatd an info toaster " + new Date().getTime());
});

const warningButton1 = document.querySelector("#js-warning-button1");
warningButton1.addEventListener("click", () => {
  toaster.warning("Creatd a warning toaster " + new Date().getTime());
});

const clearButton = document.querySelector("#js-clear-button");
clearButton.addEventListener("click", () => {
  toaster.clear();
});

toaster.success(
  "Your very own toaster was created on page load. Look at readme for more examples."
);
