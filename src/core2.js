import { isUndefined, isInstance } from "./value.js";
import {makeToast, insertToast} from "./dom.js";
import {loadedStyles, injectStyles} from "./style.js";

/*
  The way it is right now, even if imported by more than one, there will
  be ever one instance of the toaster.

  Need to decide if an application can only have one instance of toaster,
  or is toaster returned everytime the new is called. If there is always
  going to be one instance of a toaster, then mehhh singleton, eh. One of the
  issues is going to be state, the object would be stateful object... code
  is more complex etc.

  let's say we return a new object that handles toasts, how would that look like?
  Oh there is also events, how would we handle events on the created toaster in the dom?
  Then that means every file would have to get a new instance every time? That's also better
  because then you are looking at the world from a component based perspective, not the
  whole application.

  How to deal with pre-configured toaster though? What is the cost of allowing the following:
  import toaster from "@ajmey/toaster"; this is very simple, it gives you a toaster
  pre-configured with all the defaults you can just use. This is valuable!

  The only thing is to handle the inject css part, and events. Using default export
  you can configure, but maybe with configure method you can?

  Also what is the downside of just using a class sugar? Is it the this situation?
  less flexible? more structur? easier to understand?

  What would happen if users mix up usage? in one file they use default toaster
  and the other they use the constructor? Maybe a factory can hadnle both
  if just a factory is exported? There should be note, try to be consistent
  dont use multiple different ways to create a toaster. Ideally, you want
  to create a toaster when your application starts, and make that available
  to your application, instead of createing new toaster instances in places
  where you need it. Now what if they fuck it up? Use default in one place and
  constructor somewhere else? The main concern is going to be injectCSS. Let's say
  in the main file they used default import, and by default it is going to inject.
  In file 2 they do constructor to create another one and they dont set inject.
  The main file has already injected, if they dont mention injectCSS we should
  assume false. If a toaster is created and injectCSS is false, the later code
  will override, and it will remove injected code. So absence of injectCss means
  no css will be injected to the document.
*/

const _t = Symbol("#toaster");

function Toaster(o) {
  if (!isInstance(this, Toaster)) {
    return new Toaster(o);
  }

  this[_t] = "toaster";

  const defaults = {
    injectCss: false,
    theme: "default",
    animation: "appear"
  };

  this.config = { ...defaults, ...o };
  /* side-effect for injecting css.
    need to check if it is aleady loaded, we are not going to load
    also if the user indicates they don't want to use injected CSS
    we will have to remove it if already there on the page.
   */

  if (this.config.injectCss) {
    if (!loadedStyles()) {
      injectStyles();
    }
  }
}

function success(message, o) {
  console.log(message, { toasterConfig: this.config, passedOptions: o });
}

function failure(message, o) {
  console.log(message, { toasterConfig: this.config, passedOptions: o });
}

function info(message, o) {
  console.log(message, { toasterConfig: this.config, passedOptions: o });
}

function warning(message, o) {
  console.log(message, { toasterConfig: this.config, passedOptions: o });
}

function clear() {
  console.log("clear now");
}

Object.assign(Toaster.prototype, {
  success,
  failure,
  info,
  warning,
  clear
});

export default Toaster({ theme: "dark", injectCss: true });

export { Toaster, Toaster as useToaster /* alias */ };
