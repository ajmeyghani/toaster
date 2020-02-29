// import toaster from "../index.min.js";
import { useToaster } from "../core.min.js";
window.toaster = useToaster();
// window.toaster = useToaster();
// window.toaster = useToaster({ theme: "dark", animation: "slide-down" });

// window.toaster = window.ajmtoaster.default;
// window.toaster = window.ajmtoaster.useToaster({ injectCss: true, animation: "slide-down", theme: "dark" });
// window.toaster = window.ajmtoaster.useToaster({
//   injectCss: false,
//   theme: "default"
// });




/* ESM: Allows overriding initialization options */
// import { useToaster } from "../src/core2.js";
// const toaster = useToaster({
//   injectCss: false,
//   animation: "slide-down",
//   theme: "dark",
// });
// window.toaster = toaster;

/* UMD: umd/index.js */
// window.toaster = window.ajmtoaster.default;

/* UMD: umd/use-toaster.js */
// const { useToaster } = window.ajmtoaster;
// window.toaster = useToaster({ animation: "slide-down" });

/* Success example */
// toaster.success("Good job, you are running the gh-pages successfully!.", {
//   dismiss: false
// });
