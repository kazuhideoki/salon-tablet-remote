/* eslint-disable @typescript-eslint/no-var-requires */
// 開発環境でinstagram apiのコールバックでhttpsにつなげつ必要がある。
// そのためにcustom serverを作って https化
// npm run httpsで起動できる。

const { createServer } = require('https');
const { parse } = require('url');
const { readFileSync } = require('fs');
import { IncomingMessage, ServerResponse } from 'http';
import next from 'next';

// const port = process.env.NEXT_PUBLIC_PORT;
const port = 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// httpsでlocalhostにアクセスしたときの鍵認証エラーの回避 next-auth用
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// https接続にするためmkcertを使って鍵を作る (参考) https://kifarunix.com/how-to-create-self-signed-ssl-certificate-with-mkcert-on-ubuntu-18-04/
const httpsOptions = {
  key: readFileSync('./src/server/local.dev+4-key.pem'),
  cert: readFileSync('./src/server/local.dev+4.pem'),
  ca: [readFileSync('./src/server/rootCA.pem')],
};

app.prepare().then(() => {
  createServer(httpsOptions, (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
