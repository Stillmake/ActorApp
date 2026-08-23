module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add(".agents/**");
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add("dist/**");

  ["_headers", "favicon.svg", "site.webmanifest", "version.json"].forEach(
    (path) => eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addFilter("json_escape", (value) =>
    JSON.stringify(String(value ?? "")).slice(1, -1)
  );

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
