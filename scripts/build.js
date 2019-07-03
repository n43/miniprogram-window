"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const cp = require("child_process");
const fs = require("fs-extra");
const paths = require("../config/paths");

fs.ensureDirSync(paths.appDist);
fs.emptyDirSync(paths.appDist);

fs.copySync(paths.appSrc, paths.appDist, {
  dereference: true,
  filter: file => {
    if (file.match(/(.js)$/)) {
      return false;
    }
    console.log(file + " -> copy finish");
    return true;
  }
});

cp.execSync("rollup -c", { stdio: "inherit" });
cp.execSync("rollup -c -i src/provider.js -o miniprogram_dist/provider.js", {
  stdio: "inherit"
});
