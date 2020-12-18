// 開発環境でinstagram apiのコールバックでhttpsにつなげつ必要がある。
// そのためにcustom serverを作って https化
// npm run httpsで起動できる。

import { createServer } from "https";
import { parse } from "url";
import next from "next";

const port = process.env.NEXT_PUBLIC_PORT;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
