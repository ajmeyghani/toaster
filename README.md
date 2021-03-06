
# Vanilla Toaster

Simple toaster in vanilla JavaScript for modern browsers.

## Why

- 🦄 Simple and elegant
- ⚡ Lightweight, 2kb gzipped CSS + JS
- 😎 Modern
- 📦 Zero Dependencies
- 🔌 Compatible with all modern UI frameworks and libraries
- 🎨 Easily customizable with themes and custom CSS

## Demo

**Check out the [demo](https://ajmeyghani.github.io/toaster/gh-pages/) page.** You can use it to play around with different kinds of toasts.

## Browser Support

Latest and the greatest.

## Usage

1. Install by `yarn add @ajmey/toaster`, or `npm i @ajmey/toaster --save`.
2. Load the toaster: `import toaster from "@ajmey/toaster"`.
3. Call any [toast](#api), eg `toaster.success("Done!", { dismiss: 1500 })`.

Using the default export above, the CSS & JS are loaded automatically. This is the fastest way to get started, but the final bundle is a little larger. Ideally, you should load the CSS and the JS separately:

**Load CSS**

```html
<link rel="stylesheet" href="node_modules/@ajmey/toaster/themes/theme-default.min.css">
```

or if you are using a bundler like Webpack:

```js
import "@ajmey/toaster/themes/theme-default.min.css";
```

Then, use in JS:

**JS**

```js
import { useToaster } from "@ajmey/toaster/toaster";
/* factory function `useToaster` does not inject CSS */
const toaster = useToaster({animation: "appear", theme: "default"});
toaster.success();
```

Please check out the [module formats](#modules) and [initialization](#initialization) sections for more details.

## API

### `toaster`

The `toaster` object has the following methods for invoking a toast:

- `success`
- `failure`
- `info`
- `warning`

The above methods all have the following signature:

`[toastType](message?: string, options?: object) -> Promise<DOM Node>`

- `message`: `string` the message to show
- `options` (optional): `object` plain object defining the options:
    - `options.dismiss`: `number` auto dismiss a toast after `dismiss` milliseconds. If the value is falsy, auto-dismiss is disabled. All toasts, except the Success toast, are dismissed by default after `1500`ms.
    - `options.title`: `string` title to be used for the toast.
    - `options.theme`: `string` you can override the theme used in initialization
    - `options.animation`: `string` you can also override the animation used initially

**Return Value**: each method will return a `promise` that resolves to the wrapper DOM element holding the toaster. The wrapper node is useful if you use set `dismiss` to `false` because you will have access to the wrapper node at that point.

**Examples:**

```js
toaster.failure("This is the message body". { title: "Error!", dismiss: false, animation: "appear", theme: "dark"});
toaster.success("Todo item was created!");
toaster.info();
toaster.failure("Something went wrong", { dismiss: false})
  .then(wrapperNode => console.log(wrapperNode));
```

`clear()`:

If you want to clear the active toast, simply call `toaster.clear()`. Returns a promise when the toasts are removed. Resolves with the number of toasts removed.

**Example**

```js
toaster.clear().then(count => console.log("cleared toasters: ", count));
```

`on(eventName, callback)`: can be used to add event handlers:

  - `eventName`: `string` the event name, possible values are: `beforeLoad`, `loaded`, `beforeCleared`, `cleared`.

  - `callback`: `function` the event handler callback to be called

**Examples:**

  ```js
  import toaster from "@ajmey/toaster";
  toaster.on("beforeLoad", () => {
    console.log("before loaded");
  });

  toaster.on("loaded", () => {
    console.log("toaster loaded.");
  });

  toaster.on("beforeClear", () => {
    console.log("beforeClear");
  });

  toaster.on("cleared", () => {
    console.log("toast cleared.");
  });
  ```

### Initialization

There are two ways that you can use a toaster object:

1. `useToaster` factory function is available in `@ajmey/toaster/toaster`. The factory function does not inject any css by default unless an `injectStyles` function is given, `useToaster(options?: object, injectStyles?: function)`:


    - `options.theme`: `string`, theme name, eg `default`, `dark`, etc. If no value is given, `default` is used.
    - `options.animation`: `string`, defining the name of the animation. Defaults to `appear` if no value is set.

    The `injectStyles` function can be passed in order to inject custom css to the page. Please see `gh-pages/index.dev3.html` for usage example.

    Basic example:

    ```js
    import { useToaster } from "@ajmey/toaster/toaster";
    const toaster = useToaster({ theme: "dark", animation: "appear" });
    toaster.success("hello world!");
    ```

2. Using the default import

    The default export on `@ajmey/toaster` is a `toaster` object with all default values. If you use this method, the CSS is also automatically injected to the page and the toaster instance is already initialized:

    Example:

    **JS**

    ```js
    import toaster from "@ajmey/toaster";
    toaster.success("Hello!");
    ```

## Themes

You can override the colors of the toaster by including your own css after the toaster's. For example, if you want to create a `light` theme, you can do:

**CSS**

```css
.ajmtoaster.theme-light,
.ajmtoaster.theme-default {
  --ajmt-white: #fff;
  --ajmt-success: green;
  --ajmt-failure: red;
  --ajmt-warning: yellow;
  --ajmt-info: blue;
  /* transition properties */
  --ajmt-duration: 400ms;
  --ajmt-easing: ease-in-out;
}
```

In the example above, we are also including `.theme-default` to account for all possible ways that the module could be loaded.

## Animations

By default, toaster uses the `appear` animation. You can create new animations using the following selectors:

```css
.ajmtoaster.--animation-slide-down,
.ajmtoaster.--animation-slide-down.--active {
    transition: transform var(--ajmt-duration) var(--ajmt-easing) 0ms,
    opacity var(--ajmt-duration) var(--ajmt-easing) 50ms;
}

.ajmtoaster.--animation-slide-down {
  opacity: 0;
  transform: translateY(-20px);
}

.ajmtoaster.--animation-slide-down.--active {
  opacity: 1;
  transform: translateY(0);
}
```

In the example above, we create a new animation called `slide-down`. Once the CSS is defined, you can pass `animation` as an option to `useToaster`:

```js
import { useToaster } from "@ajmey/toaster/toaster";
const toaster = useToaster({ animation: "slide-down" });
```

## Overriding CSS

It's very easy to override every CSS rule, since all of them use a single class name with one or two modifiers max:

- `.ajmtoaster`: the main wrapper around the whole toaster.
- `.ajmtoaster__inner`: inner content of the toaster.
    - `.ajmtoaster__inner.--success`: success modifier
    - `.ajmtoaster__inner.--failure`: failure modifier
    - `.ajmtoaster__inner.--warning`: warning modifier
    - `.ajmtoaster__inner.--info`: info modifier
- `.ajmtoaster__title`: the title for the toaster.
- `.ajmtoaster__message`: toaster message.
-  `.ajmtoaster__dismiss`: the button to dismiss the toaster.

Every single class above have a theme modifier as well, in the form of `.[classname].[theme]`. For example:

- `.ajmtoaster.theme-dark`
- `.ajmtoaster__inner.theme-dark`
- `.ajmtoaster__inner.--success.theme-dark`
- etc

## Modules

This package is available both in ES and UMD formats:

**ESM**

```js
import toaster from "@ajmey/toaster"; // default import
import {useToaster, injectStyles} from "@ajmey/toaster/toaster";
```

All the ESM modules are importable from the root `@ajmey/toaster/<module>`:

- index.js
- toaster.js
- themes.js

**UDM**

All the UMD formats are available in the `node_modules/@ajmey/toaster/umd`. When loaded in the global context, `window.ajmtoaster` is available. For example:

```html
<script src="node_modules/@ajmey/toaster/umd/index.js"></script>
<script>
  console.log(window.ajmtoaster.themes.baseCss.length);
  window.toaster = window.ajmtoaster.default;
  window.toaster2 = window.ajmtoaster.useToaster({ animation: "appear", theme: "dark"})
  window.toaster2.failure("Something went wrong.");
</script>
```

## Bundle Size

### minified + gzipped

If using JS/CSS separately, the smallest total size will be: **1.4K + 772B = 2.172 kb**:

- **esm/toaster.min.js.gz**: 1.4K
- **themes/theme-default.min.css.gz**: 772B

## Development

- Make sure to install the latest LTS version of Node: `nvm install --lts`.
- Install yarn with `npm i -g yarn`.
- Install dependencies with `yarn install`.
- Run `yarn dev` to start rollup and css watch.
- Update code in the `src/` folder.
- Run the examples (gh-pages) locally: `yarn serverd`
- Open `http://localhost:8080/gh-pages/index.dev*.html` to check the functionality.
- To run the e2e tests in watch mode, run `yarn server && yarn e2ew`. TestCafe will start testing whats served at 8080.

## Maintainer

To publish a new version:

- `yarn prep` and git add and commit all.
- `npm version patch|minor|major` && `yarn build` && `npm publish --access=public`
