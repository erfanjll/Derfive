const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = process.env.DERFIVE_ROOT || __dirname || process.cwd();

function run(cmd, cwd) {
  try {
    const stdout = execSync(cmd, { cwd, encoding: "utf8", timeout: 600_000, stdio: ["ignore", "pipe", "pipe"] });
    return { ok: true, stdout: stdout.trim(), stderr: "" };
  } catch (e) {
    return { ok: false, stdout: "", stderr: (e.stdout || "").trim(), stderrBuf: (e.stderr || "").toString().trim() };
  }
}

// 1) tsc --noEmit
console.log("RUNNING_TSC");
const tsc = run("node node_modules/typescript/bin/tsc --noEmit", root);
fs.writeFileSync(path.join(root, "tsc-noemit-status.txt"), tsc.ok ? "OK" : "FAIL");
fs.writeFileSync(path.join(root, "tsc-noemit-stdout.txt"), tsc.stdout);
fs.writeFileSync(path.join(root, "tsc-noemit-stderr.txt"), tsc.stderrBuf || tsc.stderr);
console.log("TSC_OK:", tsc.ok);
console.log("TSC_STDOUT_LEN:", tsc.stdout ? tsc.stdout.length : 0);
console.log("TSC_STDERR_LEN:", (tsc.stderrBuf || tsc.stderr) ? (tsc.stderrBuf || tsc.stderr).length : 0);

// 2) npm run build
console.log("RUNNING_BUILD");
const build = run("npm run build", root);
fs.writeFileSync(path.join(root, "build-status.txt"), build.ok ? "OK" : "FAIL");
fs.writeFileSync(path.join(root, "build-stdout.txt"), build.stdout);
fs.writeFileSync(path.join(root, "build-stderr.txt"), build.stderrBuf || build.stderr);
console.log("BUILD_OK:", build.ok);
console.log("BUILD_STDOUT_LEN:", build.stdout ? build.stdout.length : 0);
console.log("BUILD_STDERR_LEN:", (build.stderrBuf || build.stderr) ? (build.stderrBuf || build.stderr).length : 0);

console.log("DONE");
