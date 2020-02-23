# Vanilla Toaster

Simple toaster in vanilla JavaScript for modern browsers.

## Work in progress, do not use in production.

## Why

I was looking for a very simple toaster, but I couldn't find one. Most of the toasters out there pack a lot of features that I didn't need. This toaster is very simple, it only shows one toast at a time. Also, it's very lightweight. has zero dependencies, and is written for modern browsers. The CSS is also very well organized, so you can easily override them without performing any kind specificity gymnastics or sprinkling`!important` all over the place.

## Browser Support

Latest and the greatest.

## Usage

- Install by `yarn add @ajmey/toaster`, or `npm i @ajmey/toaster --save`.
- Load the toaster instance `import toaster from "@ajmey/toaster`".
- Load a theme with a link tag `<link rel="stylesheet" href="node_modules/@ajmey/toaster/theme-default.min.css" />`.
- Call any toast that you like, eg `toaster.success("Done!", { dismiss: 1500 })`.

### Note

If you don't want to include a CSS file, you can take advantage of `useToaster` to initialize the toaster with injected CSS:

```
import { useToaster } from "@ajmey/toaster";
const toaster = useToaster({ theme: "default", injectCss: true });
toaster.success("Done!");
```

## Themes

You can override the colors of the toaster by including your own css after the toaster's css. For example, if you want to create a `light` theme, you can do:

**JS**
```js
import { useToaster } from "@ajmey/toaster";
const toaster = useToaster({ theme: "light", injectCss: true });
```

**CSS**

```css
.ajmtoaster.theme-light {
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

Or if you are using the the default export and manually including a CSS theme file, you can override the default theme:

**JS**

```js
import toaster from "@ajmey/toaster";
toaster.success("hello");
```

**HTML**

```html
<link rel="stylesheet" href="node_modules/@ajmey/toaster/theme-default.min.css" />
<script src="/example/main.js" type="module"></script>
<style>
  .ajmtoaster.theme-default {
    --ajmt-white: #f6f6f6;
    --ajmt-success: green;
    --ajmt-failure: red;
    --ajmt-warning: yellow;
    --ajmt-info: blue;
    /* transition properties */
    --ajmt-duration: 400ms;
    --ajmt-easing: ease-in-out;
  }
</style>
```

## Animation

By default, toaster uses the `appear` animation. You can create new animations using the following selectors:

```css
.ajmtoaster.--animation-slide-down,
.ajmtoaster.--animation-slide-down.--active {
    transition: transform var(--ajmt-duration) var(--ajmt-easing) 0ms,
    opacity var(--ajmt-duration) var(--ajmt-easing) 50ms;
}

.ajmtoaster.--animation-slide-down {
  opacity: 0;
  transform: scale(1.1);
}

.ajmtoaster.--animation-slide-down.--active {
  opacity: 1;
  transform: scale(1);
}
```

In the example above, we create a new animation called `slide-down`. Once the CSS is defined, you can pass `animation` as an option to `useToaster`:

```js
import { useToaster } from "@ajmey/toaster";
const toaster = useToaster({ theme: "default", animation: "slide-down" });
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


## API

### `toaster`

The `toaster` object has the following methods for invoking a toast:

- `success`
- `failure`
- `info`
- `warning`

The above methods all have the following signature:

`(message: string, options: object):`

- `message`: `string` the message to show
- `options`: `object` plain object defining the options
    - `options.dismiss`: `number` auto dismiss a toast after `dismiss` milliseconds.
    - `options.title`: `string` title to be used for the toast.

`clear()`:

If you want to clear the active toast, simply call `toaster.clear()`.

### Initialization

There are two ways that you can initialize a toaster object:

1. Using the initialization function `useToaster(options: object)`:

    `useToaster` gives you more control over the initialization. It takes an `options` object in the following form:

    - `options.theme`: `string`, theme name, eg `default`, `dark`, etc. If no value is given `default` is used.
    - `options.injectCss`: `boolean`, if set to true, the specified theme is automatically injected to the page in a `style` tag and you won't have to include any css files. Default to `true`
    - `options.animation`: `string`, defining the name of the animation. Defaults to `appear`. Available values are `appear` and `slide-down`.

    Example:

    ```
    import { useToaster } from "@ajmey/toaster";
    const toaster = useToaster({ theme: "dark", injectCss: true, animation: "slide-down" });
    toaster.success("hello world!");
    ```


2. Using the default export:

    The default export is a `toaster` object. If you use this method, you have to manually include a theme file. There are two themes already included:

    - `theme-dark.min.css`
    - `theme-default.min.css`

    Example:

    **JS**

    ```
    import toaster from "@ajmey/toaster";
    toaster.success("Hello!");
    ```

    **Html**

    ```
    <head>
      <link rel="stylesheet" href="node_modules/@ajmey/toaster/theme-default.min.css" />
    </head>
    ```

## Development

- Make sure to install the latest LTS version of Node: `nvm install --lts`.
- Install yarn with `npm i -g yarn`.
- Install dependencies with `yarn install`.
- Update code in the `src/` folder.
- Run the examples (gh-pages) locally: `http-server . -c-1`
- Open `http://localhost:8080/gh-pages/` to see the examples. If you don't have `http-server` installed, you can install it with `npm i -g http-server`.
- Run `yarn css` to minify all the CSS files and output the `themes` folder.
- In order to support CSS injection and separate CSS files, make sure to update `src/*.css` files first, and then update `src/*.css.js` equivalent files.

## Maintainer

- To update `gh-pages` run `yarn gh`.
- Run `npm run prep && npm version patch|minor|major && npm publish --access=public` to publish the latest version.

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
- [ ] Make it easier to maintain CSS styles in css or js implementations.
- [ ] Testem browser testing: testem, test cafe ?
- [ ] Add build task to bundle up and minify js.

