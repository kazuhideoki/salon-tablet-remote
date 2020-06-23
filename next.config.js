var dev = process.env.NODE_ENV !== "production";

var server = dev
  ? "http://localhost:3000"
  : "https://salon-tablet.com";
  
module.exports = {
  // server.tsからnextjsのapi routeに移行して、next buildしようとしたら
  // エラー Module not found: Can't resolve 'fs' in のエラーが出たのでこれで無効化
  webpack: (config, { isServer }) => {
    // eslint-disable-line
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
        tls: "empty",
      };
    }

    return config;
  },
  env: {
    // 本番環境safariで null/session のエラーになったので session()内部のfetchを↓で absolute URLにできるはず
    NEXTAUTH_SITE: "http://localhost:3000",
  },
};


