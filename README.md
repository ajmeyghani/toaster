# Toaster

Simple toaster in vanilla JavaScript for modern browser.

## WIP: work in progress, do not use in production.

## Usage

- Install by `yarn add @ajmey/toaster`, or `npm i @ajmey/toaster --save`.
- Load the toaster instance `import toaster from "@ajmey/toaster`".
- Call any toaster that you like, eg `toaster.success("hello!")`

## API

The `toaster` object has the following methods:

- `success`
- `failure`

Both methods has the following signature:

`method(message, options):`

- `message`: [string] the message to show
- `options`: [object] plain object defining the options
    - `options.dismiss`: [number] auto dismiss toaster after [dismiss] milliseconds.
    - `options.title`: [string] title to be used for the toaster.

### TODO

- [x] Basic toaster working.
- [x] Add default styles.
- [ ] Add a nice default theme.
- [ ] Allow defining custom themes.
- [ ] Configure default behavior and options when importing
