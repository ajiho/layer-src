import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import getBanner from "./build/banner.mjs";

const plugins = [
  resolve(),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    exclude: ["node_modules/**"],
  }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    terser({
      output: {
        comments() {
          return false;
        },
      },
    })
  );
}

const config = [];

const base = {
  banner: getBanner(),
  sourcemap: true, //方便调试
};

let input = "src/js/layer.js";
let file = "dist/js/layer.js";
if (process.env.NODE_ENV === "production") {
  file = file.replace(/\.js$/, ".min.js");
}

config.push({
  input,
  output: {
    ...base,
    format: "umd",
    name: "layer",
    file,
    globals: {
      jquery: "jQuery",
    },
  },
  external: ['jquery'],
  plugins,
});

export default config;
