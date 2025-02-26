module.exports = {
  siteUrl: 'https://www.demo.landver.net', // Replace with your website URL
  generateRobotsTxt: true, // Generate a robots.txt file
  exclude: [], // Exclude specific routes
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'black-listed-bot',
        disallow: [],
      },
    ],
    additionalSitemaps: [
      'https://www.demo.landver.net/sitemap.xml', // Add additional sitemaps if needed
    ],
  },
};