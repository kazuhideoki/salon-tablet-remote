
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
  // ↓効いてない？意味ない？
  env: {
    NEXTAUTH_BASE_PATH: `http://localhost:3000/api/auth`,
  },
};


