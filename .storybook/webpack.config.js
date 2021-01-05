module.exports = {
  // エラー Module not found: Can't resolve 'fs', 'net', 'tls' in のエラーが出たのでこれで無効化
  node: {
    child_process: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    worker_threads: 'empty',
    'fast-crc32c': 'empty',
  },
};
