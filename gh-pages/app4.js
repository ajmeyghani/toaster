import { useToaster } from "../src/core2.js";
const toaster = useToaster({theme: "dark", animation: "slide-down", injectCss: false});
toaster.success("from app4 saying success.");

console.log(toaster);

export default 4;
