import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import clear from "rollup-plugin-clear";
import postcss from "rollup-plugin-postcss";

const postCssConfig = postcss({
  extensions: [".css"],
  inject: false
});

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
    presets: [
      [
        "@babel/preset-env",
        {
          // "useBuiltIns": "false",
          // targets: import targets from "./babel-targets.js"
        }
      ]
    ],
    plugins: []
  };
  return babel(result);
};

const commonPlugins = [
  replaceOptions,
  json(),
  postCssConfig,
  resolveConf,
  commonjs(),
  clean
];

const makeBuildConfig = (format, plugins, conditionalPlugins) => module => {
  const input = module.replace(".min", "");
  const allPlugins = [...plugins];

  if (typeof conditionalPlugins === "function") {
    allPlugins.push(...conditionalPlugins(module));
  }

  return {
    input: `./src/${input}.js`,
    output: {
      name: "ajmtoaster",
      file: `./${format}/${module}.js`,
      format,
      exports: "named",
      sourcemap: true
    },
    external: [],
    plugins: allPlugins
  };
};

const esModules = [
  "index",
  "index.min",
  "toaster",
  "toaster.min",
  "themes",
  "themes.min"
];

export { commonPlugins, makeBuildConfig, esModules, runBabel };
