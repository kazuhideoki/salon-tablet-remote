const { createServer } = require("https");
const { parse } = require("url");
const { readFileSync } = require("fs");
import next from "next";

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  // key: readFileSync("../ca/localhost-key.pem"),
  // cert: readFileSync("../ca/localhost.pem"),
  key: readFileSync("./src/server/localhost-key.pem"),
  cert: readFileSync("./src/server/localhost.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
