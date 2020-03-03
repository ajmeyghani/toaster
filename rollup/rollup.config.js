
import { terser } from "rollup-plugin-terser";
import {
  commonPlugins,
  makeBuildConfig,
  esModules,
  runBabel
} from "./rollup.common.js";

const minify = module => {
  if (module.includes(".min")) {
    return [terser()];
  }
  return [];
};

const buildEsModules = esModules.map(
  makeBuildConfig("esm", [...commonPlugins], minify)
);

const buildUmdModules = ["index", "index.min"].map(
  makeBuildConfig("umd", [...commonPlugins, runBabel()], minify)
);

const allBuilds = [
  ...buildEsModules,
  ...buildUmdModules
];


export default allBuilds;
