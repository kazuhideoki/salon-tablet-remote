// 【PWA対応】withOffline を読み込む
//github.com/hanford/next-offline

// var withOffline = require("next-offline");
// var nextConfig = { dontAutoRegisterSw: true }

var withPWA = require("next-pwa");
var nextConfig = {
  pwa: {
    dest: "public",
  },
};

// nextConfig を渡す
module.exports = withPWA(nextConfig);
