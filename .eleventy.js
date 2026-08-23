module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add(".agents/**");
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add("dist/**");

  ["_headers", "favicon.svg", "site.webmanifest", "version.json"].forEach(
    (path) => eleventyConfig.addPassthroughCopy(path)
  );
  eleventyConfig.addPassthroughCopy({ "assets/app.jpg": "assets/app.jpg" });

  eleventyConfig.addFilter("json_escape", (value) =>
    JSON.stringify(String(value ?? "")).slice(1, -1)
  );

  eleventyConfig.addFilter("filesize", (bytes) => {
    const n = Number(bytes);
    if (!Number.isFinite(n) || n <= 0) return "";
    const mb = n / (1024 * 1024);
    const label = mb >= 10 ? mb.toFixed(1) : mb.toFixed(1);
    return `${label.replace(/\.0$/, "")} MB`;
  });

  eleventyConfig.addFilter("date_to_xmlschema", (value) =>
    value ? new Date(value).toISOString() : ""
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid"],
  };
};
