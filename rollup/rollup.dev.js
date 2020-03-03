import {
  commonPlugins,
  makeBuildConfig,
  esModules,
  runBabel
} from "./rollup.common.js";

const devEsModules = esModules.filter(v => !/\.min$/.test(v));
const devUmdModules = esModules.filter(
  v => v.includes("index") && !v.includes(".min")
);

const buildEsModules = devEsModules.map(
  makeBuildConfig("esm", [...commonPlugins])
);

const buildUmdModules = devUmdModules.map(
  makeBuildConfig("umd", [...commonPlugins, runBabel()])
);

// const allBuilds = [...buildEsModules, ...buildUmdModules];

export default buildEsModules;
