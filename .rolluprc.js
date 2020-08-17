import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import {terser} from "rollup-plugin-terser";

import pkg from "./package.json";

const buildDir = "lib";
const extensions = [".js", ".ts", ".tsx"];
const include = "src/**/*";
const exclude = "node_modules/**";

const commonOutputs = {
  exports: "named",
  sourcemap: true,
  globals: {
    react: "React",
    "@babel/runtime/helpers/slicedToArray": "_slicedToArray",
  },
};

export default {
  input: "src",
  external: ["react", /@babel\/runtime/],
  output: [
    {
      format: "umd",
      file: `${buildDir}/index.umd.js`,
      name: pkg.name,
      ...commonOutputs,
    },
    {
      format: "es",
      file: `${buildDir}/index.esm.js`,
      ...commonOutputs,
    },
  ],
  plugins: [
    resolve({extensions}),
    babel({include, exclude, extensions, babelHelpers: "runtime"}),
    terser({output: {comments: () => false}}),
  ],
};
