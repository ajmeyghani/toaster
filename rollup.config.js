import babel from 'rollup-plugin-babel';
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
      /* in code, process.env.nodeEnv will be the value
       * of NODE_ENV used at build time.
       */
      nodeEnv: process.env.NODE_ENV
    }
  })
});

const runBabel = () => {
  const result = {
    babelrc: false,
    "presets": [
      [
        "@babel/preset-env",
        {
          // "useBuiltIns": "false"
          /* prefer to use defaults options */
          // targets: {
          //   "chrome": "44",
          //   "edge": "12",
          //   "firefox": "21",
          //   "ie": "11",
          //   "safari": "9.1",
          //   "opera": "31"
          // }
        }
      ]
    ],
    plugins: [],
  };
  return babel(result);
};

const defaultPlugins = [replaceOptions, resolveConf, commonjs(), clean];

const makeBuildConfig = format => module => {
  const input = module.replace(".min", "");
  const plugins = [...defaultPlugins];

  if (format === "umd") {
    plugins.push(runBabel());
  }

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
  "core",
  "core.min"
];

const buildEsModules = modules.map(makeBuildConfig("esm"));
const buildUmdModules = modules.map(makeBuildConfig("umd"));

export default buildEsModules.concat(buildUmdModules);
