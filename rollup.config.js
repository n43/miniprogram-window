const nodeResolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const { terser } = require("rollup-plugin-terser");

const babelConfig = {
  babelrc: false,
  exclude: "node_modules/**",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 11"]
        },
        exclude: ["transform-async-to-generator", "transform-regenerator"],
        loose: true,
        modules: false
      }
    ]
  ],
  plugins: ["@babel/plugin-proposal-object-rest-spread"]
};

module.exports = [
  // Miniprogram
  {
    input: "src/index.js",
    output: {
      file: "miniprogram_dist/index.js",
      format: "cjs"
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel(babelConfig),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
];
