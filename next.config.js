var dev = process.env.NODE_ENV !== "production";
  
module.exports = {

  // google cloud platformではbuildフォルダが必要なのでbuild先を設定
  // distDir: "build",

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
};


