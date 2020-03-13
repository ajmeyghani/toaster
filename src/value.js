const UNDEFINED = void 0;

const isUndefined = v => v === UNDEFINED;

const isNull = v => v === null;

const isNumber = v => !window.Number.isNaN(v) && typeof v === "number";

const isString = v => typeof v === "string";

const isBoolean = v => typeof v === "boolean";

const isSymbol = v => typeof v === "symbol";

const isObject = v =>
  typeof v !== "function" && typeof v === "object" && !isNull(v);

const isPlainObject = v =>
  Object.prototype.toString.call(v) === "[object Object]";

const isFunction = v => typeof v === "function";

/* checks if v is null or undefined */
const isAbsent = v => v == UNDEFINED;

const isTruthy = v => {
  if (v) {
    return true;
  }
  return false;
};

const isInstance = (i, f) =>
  isObject(i) && Reflect.getPrototypeOf(i) === f.prototype;

export {
  UNDEFINED,
  isUndefined,
  isNull,
  isNumber,
  isString,
  isBoolean,
  isSymbol,
  isObject,
  isPlainObject,
  isFunction,
  isAbsent,
  isTruthy,
  isInstance
};
