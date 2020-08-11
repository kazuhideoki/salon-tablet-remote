module.exports = {
  // エラー Module not found: Can't resolve 'fs', 'net', 'tls' in のエラーが出たのでこれで無効化
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
};