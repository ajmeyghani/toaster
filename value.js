const isPlainObject = v =>
  Object.prototype.toString.call(v) === "[object Object]";

const isString = v => typeof v === "string";

const isBoolean = v => typeof v === "boolean";

export {
  isPlainObject, isString, isBoolean
}
