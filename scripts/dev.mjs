import { spawn } from "node:child_process";

const children = [];

function run(command, args, extraEnv = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    env: {
      ...process.env,
      CHOKIDAR_USEPOLLING: "1",
      ...extraEnv,
    },
  });

  children.push(child);
  child.on("exit", (code) => {
    if (code && code !== 0) {
      process.exitCode = code;
      shutdown();
    }
  });
}

function shutdown() {
  while (children.length > 0) {
    const child = children.pop();
    if (child && !child.killed) {
      child.kill("SIGTERM");
    }
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

run("./node_modules/.bin/sass", [
  "--watch",
  "--poll",
  "--load-path=_sass",
  "assets/main.scss:dist/assets/main.css",
  "--style=expanded",
  "--no-source-map",
]);
run("./node_modules/.bin/eleventy", ["--serve"], { ACTOR_BASE: "" });
