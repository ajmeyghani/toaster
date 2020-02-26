# Vanilla Toaster

Simple toaster in vanilla JavaScript for modern browsers.

>##Work in progress, do not use in production. The API is not stable.##

## DEMO

**Check out the [demo](https://ajmeyghani.github.io/toaster/gh-pages/) page.** You can use it to play around with different kinds of toasts.

## Why

I was looking for a very simple toaster, but I couldn't find one. Most of the toasters out there pack a lot of features that I didn't need. This toaster is very simple, it only shows one toast at a time. Also, it's very lightweight (< 2kb gzipped), has zero dependencies, and is written for modern browsers. The CSS is also very well organized, you can easily override it or use it to create new themes and animations with no hassle.

## Browser Support

Latest and the greatest.

## Usage

1. Install by `yarn add @ajmey/toaster`, or `npm i @ajmey/toaster --save`.
2. Load the toaster: `import toaster from "@ajmey/toaster"`.
3. Call any [toast](#api) that you like, eg `toaster.success("Done!", { dismiss: 1500 })`.

Using the default export above the CSS & JS are loaded automatically. This is the fastest way to get started, but the final bundle is a little larger. Ideally, you should load the CSS and the JS separately:

**HTML**

```html
<link rel="stylesheet" href="node_modules/@ajmey/toaster/themes/theme-default.min.css">
```

**JS**

```js
import newToaster from "@ajmey/toaster/esm/core.js";
const toaster = newToaster({animation: "slide-down"});
```

For more details on available module formats and initialization methods, check out the [module formats](#modules) section.

## API

### `toaster`

The `toaster` object has the following methods for invoking a toast:

- `success`
- `failure`
- `info`
- `warning`

The above methods all have the following signature:

`[toastType](message: string, options: object): Promise<DOM Node>`

- `message`: `string` the message to show
- `options`: `object` plain object defining the options
    - `options.dismiss`: `number` auto dismiss a toast after `dismiss` milliseconds. If the value is falsy, auto-dismiss is disabled. Success toasts are automatically dismissed after `1500` ms. Other types of toasts are not dismissed automatically.
    - `options.title`: `string` title to be used for the toast. Default titles are: Success, Oops, Info, and Warning.

**Return Value**: Each method will return a `promise` that resolves to the wrapper DOM element holding the toaster. The wrapper node is useful if you use set `dismiss` to `false` because you will have access to the wrapper node at that point.

**Examples:**

```js
toaster.failure("This is the message body". { title: "Error!", dismiss: false});
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

### `Initialization`

There are two ways that you can initialize a toaster object:

1. Using the initialization function `useToaster(options: object)`:

    `useToaster` gives you more control over the initialization. It takes an `options` object in the following form:

    - `options.theme`: `string`, theme name, eg `default`, `dark`, etc. If no value is given `default` is used.
    - `options.injectCss`: `boolean`, if set to true, the specified theme is automatically injected to the page in a `style` tag and you won't have to include any css files. Default to `true`
    - `options.animation`: `string`, defining the name of the animation. Defaults to `appear`. Available values are `appear` and `slide-down`.

    Example:

    ```js
    import { useToaster } from "@ajmey/toaster/esm/use-toaster";
    const toaster = useToaster({ theme: "dark", injectCss: true, animation: "slide-down" });
    toaster.success("hello world!");
    ```


2. Using the default export:

    The default export is a `toaster` object with all default values. If you use this method, the CSS is also automatically injected to the page.

    Example:

    **JS**

    ```js
    import toaster from "@ajmey/toaster";
    toaster.success("Hello!");
    ```

### `esm/core.js`

This file only includes the JavaScript and it exports a single function `newToaster` that has the same signature as `useToaster`. Except that it doesn't recognize the `injectCss` option.

```js
import newToaster from "@ajmey/toaster/esm/core";
const toaster = newToaster({theme: "dark", animation: "slide-down"});
```

If you load the module using this method, you need to make sure to include a theme file:

```html
<link rel="stylesheet" href="node_modules/@ajmey/toaster/themes/theme-default.min.css">
```

## Themes

You can override the colors of the toaster by including your own css after the toaster's css. For example, if you want to create a `light` theme, you can do:

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
import newToaster from "@ajmey/toaster/esm/core";
const toaster = newToaster({ animation: "slide-down" });
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

This package is available both in ES and UMD format:

**ESM**

```js
import toaster from "@ajmey/toaster";
import newToaster from "@ajmey/toaster/esm/core";
import {useToaster} from "@ajmey/toaster/esm/use-toaster";
```

**UDM**

All the UMD formats are available in the `node_modules/@ajmey/toaster/umd`. When loaded in the global context, `window.ajmtoaster` is available. For example:

```html
<script src="node_modules/@ajmey/toaster/umd/index.js"></script>
<script>
  window.toaster = window.ajmtoaster.default;
  toaster.success("hello.");
</script>
```


## Bundle Size

### Minified

- CSS: `themes/theme-default.min.css`: 2.5 kb
- JS: `esm/core.min.js`: 2.4 kb
- total: 2.5 kb + 2.4 kb = 4.9 kb

### minified + gzipped

- CSS: `themes/theme-default.min.css.gz`: 827 bytes
- JS: `esm/core.min.js.gz`: 1.1 kb
- total: 1.1 kb + 827 b = 1.927 kb Gzipped

## Development

- Make sure to install the latest LTS version of Node: `nvm install --lts`.
- Install yarn with `npm i -g yarn`.
- Install dependencies with `yarn install`.
- Update code in the `src/` folder.
- Run the examples (gh-pages) locally: `http-server . -c-1`
- Open `http://localhost:8080/gh-pages/` to see the examples. If you don't have `http-server` installed, you can install it with `npm i -g http-server`.
- Run `yarn css` to minify all the CSS files and output the `themes` folder.
- In order to support CSS injection and separate CSS files, make sure to update `src/*.css` files first, and then update `src/*.css.js` equivalent files.
- Run `yarn build` to build both the css and js.

## Maintainer

- To update `gh-pages` run `yarn gh`.
- Run `yarn build && yarn prep && npm version patch|minor|major && npm publish --access=public` to publish the latest version.

## TODO

- [x] Basic toaster working.
- [x] Add default styles.
- [x] Add a nice default theme.
- [x] Allow defining custom themes.
- [x] Add docs on how to override styles.
- [x] Configure default behavior and options when importing.
- [x] Add animations for default theme.
- [x] Add gh pages
- [x] Add different types of animation?
- [x] Add build task to bundle up and minify js, webpack?
- [ ] Add events
- [ ] Make it easier to maintain CSS styles in css or js implementations.
- [ ] Testem browser testing: testem, test cafe ?


