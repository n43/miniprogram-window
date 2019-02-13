"use strict";

const path = require("path");
const fs = require("fs");
const url = require("url");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp("."),
  appDist: resolveApp("miniprogram_dist"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appNodeModules: resolveApp("node_modules")
};
