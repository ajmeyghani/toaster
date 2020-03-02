import themes from "./themes.js";
import { useToaster, injectStyles } from "./toaster.js";
const toaster = useToaster(
  { animation: "slide-down", theme: "default" },
  injectStyles(themes)
);
export default toaster;
export { useToaster, themes };
