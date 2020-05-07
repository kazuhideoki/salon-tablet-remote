import express from "express";
import next from "next";
import bodyParser from "body-parser";

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "salon_tablet",
        charset: "utf8mb4",
},
});
const Bookshelf = require('bookshelf')(knex)
const ArticlesTable = Bookshelf.Model.extend({
    tableName: "articles",
});


function corsHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, application/json"
    );
}  

import { TArticles, PaginationParams, ArticleWithoutId, TArticle } from "../app/Store/Store";
export type ResData = {
    rawData: TArticles,
    pagination: PaginationParams
}

app.prepare().then(() => {

    server.use(bodyParser.json({ limit: "50mb" }));
    server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    // ':page'の部分にpage番号を入れてポストデータとページネーションを返す
    server.get("/articles/get/:page", (req, res) => {
      corsHeader(res)
        const pg = req.params.page

        new ArticlesTable()
          .orderBy("created_at", "desc")
          // pageSizeは一度に取得する記事数
          .fetchPage({ page: pg, pageSize: 5 })

          // .fetchAll()

          .then((result) => {
            const data: ResData = {
              rawData: result.toArray(),
              pagination: result.pagination,
            };
            console.log("/articles/get/:pageは " + JSON.stringify(data));

            res.send(data);
          })
          .catch((err) => {
            // console.log("/articles/get/:pageのエラーは " + JSON.stringify(err));

            res.status(500).json({ err: true, data: { message: err.message } });
          });
    });
  
    // 新規投稿用のPOST。{ title, date, content }を渡せばidは自動連番で振られる。
    server.post("/articles/create/post", (req, res) => {
      corsHeader(res);
      const params: ArticleWithoutId = req.body;
      // new Articles({
      //   title: title,
      //   is_published,
      //   created_at: created_at,
      //   article_content: article_content,
      // })
      new ArticlesTable(params)
        .save()
        .then((result) => {
          const data = {
            rawData: result,
            pagination: result.pagination,
          };
          res.send(data);
        })
        .catch((err) => {
          res.status(500).json({
            err: true,
            data: { message: err.message },
          });
        });
    });

     server.post("/articles/get/singlepost", (req, res) => {
       corsHeader(res);
        new ArticlesTable()
          .where("id", "=", req.body.id)
          .fetch()
          .then((result) => {
            const data = { rawData: result };
            res.send(data);
          })
          .catch((err) => {
            res.status(500).json({ err: true, data: { message: err.message } });
          });         
    });

    //  編集した記事をアップデートする。
    server.post("/articles/update/post", (req, res) => {
      corsHeader(res);
        const params: TArticle = req.body

        new ArticlesTable()
          .where("id", params.id)
          // .save({
          //     title: title,
          //     date: date,
          //     content: content,
          // },{patch:true})
          .save(params, { patch: true })
          .then((result) => {
            console.dir("updatepostのresultは " + JSON.stringify(result));
            const data = { rawData: result };
            res.send(data);
          })
          .catch((err) => {
            res.status(500).json({
              err: true,
              data: { message: err.message },
            });
          });         
    });

// Idを渡して多少のデータを削除する
     server.post("/articles/delete/post", (req, res) => {
       corsHeader(res);
       const id = req.body.id;
       new ArticlesTable()
         .where("id", id)
         .fetch()
         .then((record) => {
           record.destroy();
         })
         .then((result) => {
           const data = { rawData: result };
           res.send(data);
         })
         .catch((err) => {
           res.status(500).json({
             err: true,
             data: { message: err.message },
           });
         });        
    });

    //   -----------ここの上にバックエンドの処理を書く-----------

    // nextのルーティング
    server.get("*", (req, res) => {
      return handler(req, res);
    });

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
