import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "_data", "release.json");
const repo = "Stillmake/releases";

const list = JSON.parse(
  execFileSync("gh", ["release", "list", "--repo", repo, "--limit", "100", "--json", "tagName,isDraft,isPrerelease"], { encoding: "utf8" })
);

const out = { version: null, build: null, dmgSize: null };
// Every app shares the repo; Actor's tags are actor-{version}-{build}, newest first.
const latest = list.find((r) => !r.isDraft && !r.isPrerelease && /^actor-[\d.]+-\d+$/.test(r.tagName));
if (latest) {
  const detail = JSON.parse(
    execFileSync("gh", ["release", "view", latest.tagName, "--repo", repo, "--json", "assets"], { encoding: "utf8" })
  );
  const dmg = (detail.assets ?? []).find((asset) => asset.name?.endsWith(".dmg"));
  const [, version, build] = latest.tagName.match(/^actor-([\d.]+)-(\d+)$/);
  out.version = version;
  out.build = Number(build);
  if (dmg && Number.isFinite(dmg.size)) out.dmgSize = dmg.size;
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote latest release to ${outPath}`);
