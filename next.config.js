// 【PWA対応】withOffline を読み込む
// next.config.js
var withOffline = require('next-offline')
 
module.exports = withOffline({ dontAutoRegisterSw: true })



// next-pwa
// var withPWA = require("next-pwa");

// var nextConfig = {
//   pwa: {
//     dest: "public",
//   },
// };

// // nextConfig を渡す
// module.exports = withPWA(nextConfig);
