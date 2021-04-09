const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  pwa: {
    name: "Among Us Detective",
    themeColor: "#000000",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    workboxOptions: {
      skipWaiting: true,
    },
    assetsVersion: process.env.APP_VERSION,
  },
  // other configuration
  configureWebpack: {
    plugins: [
      // Only add Sentry.js logging in production and during build time
      ...(process.env.NODE_ENV === "production"
        ? [
            new SentryWebpackPlugin({
              // sentry-cli configuration
              authToken: process.env.SENTRY_AUTH_TOKEN,
              org: "atlesque-media-vof",
              project: "among-us-detective",

              // webpack specific configuration
              include: "./dist",
              ignore: ["node_modules", "webpack.config.js"],
            }),
          ]
        : []),
    ],
  },
};
