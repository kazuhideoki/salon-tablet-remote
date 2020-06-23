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
  // env: {
  //   // 本番環境safariで null/session のエラーになったので session()内部のfetchを↓で absolute URLにできるはず
  //   // sessionをserverSideで使う場合有効らしい
  //   // https://github.com/iaincollins/next-auth/issues/299
  //   // NEXTAUTH_SITE: "http://localhost:3000",→ PC 本番環境safariでうまく動作。 iPadで未だ動作せず。
  //   // ↑末尾に「/」つけても同じ

  //   NEXTAUTH_SITE: "https://salon-tablet.com",
  // },
};


