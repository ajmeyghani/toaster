const isPlainObject = v =>
  Object.prototype.toString.call(v) === "[object Object]";
const isString = v => typeof v === "string";

export {
  isPlainObject, isString
}
