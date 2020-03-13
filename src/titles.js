const types = {
  SUCCESS: "success",
  FAILURE: "failure",
  INFO: "info",
  WARNING: "warning"
};

const titles = {
  [types.SUCCESS]: "Success!",
  [types.FAILURE]: "Oops...",
  [types.INFO]: "Note!",
  [types.WARNING]: "Warning!"
};

export {
  types,
  titles
}
