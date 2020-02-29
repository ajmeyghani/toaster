import { useToaster } from "./core.js";
import { injectStyles } from "./style.js";
import themes from "./themes.js";

export default useToaster({ injectCss: true }, injectStyles(themes));
export { useToaster };
