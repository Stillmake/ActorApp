import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "_data", "releases.json");
const repo = "Stillmake/ActorApp";

const list = JSON.parse(
  execFileSync("gh", ["release", "list", "--repo", repo, "--limit", "100", "--json", "tagName,name,publishedAt,isDraft,isPrerelease"], { encoding: "utf8" })
);

const releases = [];
for (const r of list) {
  let body = "";
  let dmgSize = null;
  let dmgUrl = null;
  try {
    const detail = JSON.parse(
      execFileSync(
        "gh",
        ["release", "view", r.tagName, "--repo", repo, "--json", "body,assets"],
        { encoding: "utf8" }
      )
    );
    body = detail.body ?? "";
    const dmg = (detail.assets ?? []).find((asset) => asset.name?.endsWith(".dmg"));
    if (dmg && Number.isFinite(dmg.size)) dmgSize = dmg.size;
    if (dmg?.url) dmgUrl = dmg.url;
  } catch {
    body = "";
  }
  releases.push({
    tag: r.tagName,
    name: r.name,
    publishedAt: r.publishedAt,
    isDraft: r.isDraft,
    isPrerelease: r.isPrerelease,
    body,
    dmgSize,
    dmgUrl,
  });
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(releases, null, 2) + "\n");
console.log(`Wrote ${releases.length} releases to ${outPath}`);
