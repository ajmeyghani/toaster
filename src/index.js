import themes from "./themes.js";
import { useToaster, injectStyles } from "./toaster.js";
export default useToaster({ injectCss: true }, injectStyles(themes));
export {
  useToaster,
  themes,
}
