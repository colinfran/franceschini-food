/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://francschini.food",
  exclude: ["/icon.svg", "/apple-icon.png", "/manifest.webmanifest", "/api", "/api/*"],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
}
