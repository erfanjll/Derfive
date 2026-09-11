const fs = require("fs");
const path = require("path");

const root = process.env.DERFIVE_ROOT || __dirname || process.cwd();
console.log("ROOT:", root);

// 1) git status
try {
  const gitStatus = require("child_process").execSync("git status --short", { cwd: root, encoding: "utf8" }).trim();
  console.log("GIT_STATUS:");
  console.log(gitStatus || "(clean)");
} catch (e) {
  console.log("GIT_STATUS_ERROR:", e.message);
}

// 2) git remote
try {
  const gitRemote = require("child_process").execSync("git remote -v", { cwd: root, encoding: "utf8" }).trim();
  console.log("GIT_REMOTE:");
  console.log(gitRemote || "(none)");
} catch (e) {
  console.log("GIT_REMOTE_ERROR:", e.message);
}

// 3) package.json next version
let pkgNext = null;
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  pkgNext = pkg.dependencies && pkg.dependencies.next;
  console.log("PKG_NEXT:", pkgNext);
} catch (e) {
  console.log("PKG_READ_ERROR:", e.message);
}

// 4) installed next version
let installedNext = null;
try {
  const nextPkg = JSON.parse(fs.readFileSync(path.join(root, "node_modules", "next", "package.json"), "utf8"));
  installedNext = nextPkg.version;
  console.log("INSTALLED_NEXT:", installedNext);
} catch (e) {
  console.log("INSTALLED_NEXT_MISSING_OR_ERROR");
}

// 5) node_modules/.bin/next existence
const binNext = path.join(root, "node_modules", ".bin", "next");
console.log("BIN_NEXT_EXISTS:", fs.existsSync(binNext));

// 6) tsc bin
const binTsc = path.join(root, "node_modules", ".bin", "tsc");
console.log("BIN_TSC_EXISTS:", fs.existsSync(binTsc));
