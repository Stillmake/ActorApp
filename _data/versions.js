const { readFileSync } = require("node:fs");
const { join } = require("node:path");

module.exports = JSON.parse(
  readFileSync(join(__dirname, "..", "changelog.json"), "utf8")
);
