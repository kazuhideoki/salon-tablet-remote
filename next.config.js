// 【PWA対応】【next-offline】 を読み込む
var withOffline = require('next-offline')

var nextConfig = {
  // 【next-offline】index.tsxのuseEffectでregisterをunregisterをするための設定
  dontAutoRegisterSw: true,
  // 【next-offline】デフォルトの/service-worker.jsでアクセスできるように出力先を../publicに
  workboxOpts: {
    swDest: "../public/service-worker.js",
  },
};
 
module.exports = withOffline(nextConfig)
