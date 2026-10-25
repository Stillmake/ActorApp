// Writes version.json, the in-app update feed, as the newest entries of
// changelog.json, the full history the site renders. Edit only
// changelog.json. With --check, fails when the committed feed is not what
// changelog.json produces.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const changelogPath = join(root, "changelog.json");
const feedPath = join(root, "version.json");

const changelog = JSON.parse(readFileSync(changelogPath, "utf8"));
if (!Array.isArray(changelog) || changelog.length === 0) {
  console.error("changelog.json must be a non-empty array, newest first.");
  process.exit(1);
}
// Same shape as the full history, so any app reads it; one behind more
// releases than this sees notes for the newest only.
const releases = changelog.slice(0, 6);
const feed = JSON.stringify(releases, null, 2);

if (process.argv.includes("--check")) {
  if (readFileSync(feedPath, "utf8") !== feed) {
    console.error("version.json is out of date with changelog.json. Run: node scripts/feed.mjs");
    process.exit(1);
  }
} else {
  writeFileSync(feedPath, feed);
  console.log(`Wrote the ${releases.length} newest releases to version.json`);
}
