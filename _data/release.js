const assert = require("node:assert");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

// The newest entry of the in-app feed in Stillmake/releases, so the site
// links exactly the DMG running apps are offered.
const releasesDir = process.env.RELEASES_DIR ?? join(__dirname, "..", "..", "releases");

module.exports = async () => {
  const [latest] = JSON.parse(
    readFileSync(join(releasesDir, "actor", "version.json"), "utf8")
  );
  assert(latest?.url, "The newest feed entry has no DMG url");
  const response = await fetch(latest.url, { method: "HEAD" });
  const dmgSize = response.ok ? Number(response.headers.get("content-length")) : null;
  return { version: latest.version, build: latest.build, url: latest.url, dmgSize };
};
