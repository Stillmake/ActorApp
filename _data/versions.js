const { readFileSync } = require("node:fs");
const { join } = require("node:path");

// The full history lives in Stillmake/releases: a sibling checkout locally,
// RELEASES_DIR in CI.
const releasesDir = process.env.RELEASES_DIR ?? join(__dirname, "..", "..", "releases");

module.exports = JSON.parse(
  readFileSync(join(releasesDir, "actor", "changelog.json"), "utf8")
);
