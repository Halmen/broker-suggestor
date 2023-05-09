const withLinaria = require("next-with-linaria");

/** @type {import('next-with-linaria').LinariaConfig} */
const config = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brokerchooser.com",
        port: "",
        pathname: "/uploads/broker_logos/**",
      },
    ],
  },
};
module.exports = withLinaria(config);
