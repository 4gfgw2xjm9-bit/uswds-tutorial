module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addWatchTarget("./_theme/");
  eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds
  eleventyConfig.setServerOptions({
    middleware: [
      (request, response, next) => {
        if (request.method === "GET" && request.url === "/") {
          response.writeHead(302, { Location: "/extend.html" });
          response.end();
          return;
        }

        next();
      },
    ],
  });
  let pathPrefix = "/";

  if (process.env.BASEURL) {
    pathPrefix = process.env.BASEURL;
  }

  return {
    pathPrefix: pathPrefix,
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dir: {
      layouts: "_layouts",
      data: "_data",
    },
  };
};
