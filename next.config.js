// 【PWA対応】withOffline を読み込む
// next.config.js
var withOffline = require('next-offline')

var nextConfig = {
  dontAutoRegisterSw: true,
  workboxOpts: { swDest: "static/service-worker.js" },
};
 
module.exports = withOffline(nextConfig)



// next-pwa
// var withPWA = require("next-pwa");

// var nextConfig = {
//   pwa: {
//     dest: "public",
//   },
// };

// // nextConfig を渡す
// module.exports = withPWA(nextConfig);
