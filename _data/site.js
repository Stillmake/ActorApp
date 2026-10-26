const release = require("./release.json");

module.exports = {
  title: "Actor",
  description: "A Ghostty-powered terminal for macOS, with a hierarchical sidebar. Native, lightweight, no setup.",
  url: "https://stillmake.com/actor",
  base: process.env.ACTOR_BASE ?? "/actor",
  repo: "https://github.com/Stillmake/ActorApp",
  release_url: `https://github.com/Stillmake/releases/releases/download/actor-${release.version}-${release.build}/Actor.dmg`,
  author: "Stillmake",
  macos_min: "15",
  lang: "en-US",
  current_year: new Date().getFullYear(),
};
