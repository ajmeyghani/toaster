import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import clear from "rollup-plugin-clear";

const resolveConf = resolve({
  customResolveOptions: {
    moduleDirectory: "src"
  }
});

const clean = clear({
  targets: ["umd", "esm"],
  watch: false
});

const replaceOptions = replace({
  process: JSON.stringify({
    env: {
      /* in code process.env.nodeEnv will be the value
       * of NODE_ENV used at build time.
       */
      nodeEnv: process.env.NODE_ENV
    }
  })
});

const defaultPlugins = [replaceOptions, resolveConf, commonjs(), clean];

const makeBuildConfig = format => module => {
  const input = module.replace(".min", "");
  const plugins = [...defaultPlugins];

  if (module.includes(".min")) {
    plugins.push(terser());
  }

  return {
    input: `./src/${input}.js`,
    output: {
      name: "ajmtoaster",
      file: `./${format}/${module}.js`,
      format: format,
      exports: "named"
    },
    external: [],
    plugins: plugins
  };
};

const modules = [
  "index",
  "index.min",
];

const buildEsModules = modules.map(makeBuildConfig("esm"));
const buildUmdModules = modules.map(makeBuildConfig("umd"));

export default buildEsModules.concat(buildUmdModules);
