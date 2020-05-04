// 【PWA対応】【next-offline】 を読み込む
var withOffline = require('next-offline')

var nextConfig = {
  // 【next-offline】index.tsxのuseEffectでregisterをunregisterをするための設定
  dontAutoRegisterSw: true,
  // 【next-offline】デフォルトの/service-worker.jsでアクセスできるように出力先をstaticに
  workboxOpts: {
    swDest: "../public/service-worker.js",
  },
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
