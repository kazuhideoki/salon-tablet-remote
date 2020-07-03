import express from "express";
import next from "next";
import { articlesValidation, footerItemsValidation } from "./validation";
import bodyParser from "body-parser";
import {
  footer_items_get,
  footer_items_create_item,
  footer_items_get_single,
  footer_items_update_item,
  footer_items_delete_item,
  footer_items_switchOrder,
} from "./footer_items/footer_items";

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

export function corsHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, application/json"
    );
}  
import { TArticles, PaginationParams } from "../app/Store/Store";
import { articles_delete, articles_update, articles_get_singlepost,
  articles_create,
  articles_get } from "./articles";

import nextauth from "../pages/api/auth/[...nextauth]";

app.prepare().then(() => {

    // なにかのエラー対応→{ limit: "50mb" }
    server.use(bodyParser.json({ limit: "50mb" }));
    server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    // ●●●articles●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
    // 記事データとページネーションを返す
    server.post("/articles/get", (req, res) => articles_get(req, res))
    // 記事作成用のPOST。{ title, created_at, article_content }を渡せばidは自動連番で振られる。
    server.post(
      "/articles/create",articlesValidation, (req, res) => articles_create(req, res)
    );
    server.post("/articles/get/singlepost", (req, res) => articles_get_singlepost(req, res));
    //  編集した記事をアップデートする。
    server.post(
      "/articles/update", articlesValidation, (req, res) => articles_update(req, res)
    );
    // Idを渡して多少のデータを削除する
    server.post("/articles/delete", (req, res) => articles_delete(req, res));

    // ●●●footer_items●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
    server.get("/footer_items/get", (req, res) => footer_items_get(req, res));
    server.post("/footer_items/create", footerItemsValidation, (req, res) =>
      footer_items_create_item(req, res)
    );
    server.post("/footer_items/get/single", (req, res) =>
      footer_items_get_single(req, res)
    );
    server.post("/footer_items/update", footerItemsValidation, (req, res) =>
      footer_items_update_item(req, res)
    );
    server.post("/footer_items/delete", (req, res) =>
      footer_items_delete_item(req, res)
    );
    server.post("/footer_items/switchOrder", (req, res) =>
      footer_items_switchOrder(req, res)
    );

    server.all("/api/auth/*", (req, res) =>
      nextauth(req, res)
    );

    //   -----------ここの上にバックエンドの処理を書く-----------
    // 上のバックエンドの処理に引っかからなかったものを↓
    // nextのルーティング。serer.allにすることでpostなども対応させてapi routeと共存できる。？→だめ
    server.get("*", (req, res) => {
      return handler(req, res);
    });
    // custome server使うとapi routeをキャッチしないので追加してみた。→だめ
    // server.post("*", (req, res) => {
    //   return handler(req, res);
    // });

    server.listen(3000, (err) => {
      if (err) console.error(err.stack);
      console.log("> Ready on http://localhost:3000");
    });
})
.catch((err) => {
console.error(err.stack);
// @ts-ignore
process.exit(1);
});
