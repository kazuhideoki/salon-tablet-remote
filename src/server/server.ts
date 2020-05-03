import express from "express";
import next from "next";
import bodyParser from "body-parser";
const { join } = require("path");
const { parse } = require("url");

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
const PostData = Bookshelf.Model.extend({
    tableName: "post_data",
});


function corsHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, application/json"
    );
}  

import { PostData, PaginationParams } from "../app/Store/Store";
export type ResData = {
    rawData: PostData,
    pagination: PaginationParams
}

app.prepare().then(() => {

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));

    // PWA対応 next-offlineを利用
    server.get("/service-worker.js", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // const filePath = join(__dirname, ".next", pathname);

      // _nextにするとよい、と言っているぺーじがあったので→結果変わらず
      const filePath = join(__dirname, "_next", pathname);

      app.serveStatic(req, res, filePath);
      
    });

    // ':page'の部分にpage番号を入れてポストデータとページネーションを返す
    server.get("/post_data/get/:page", (req, res) => {
      corsHeader(res)
        const pg = req.params.page

        new PostData()
            .orderBy("date", "desc")
            // pageSizeは一度に取得する記事数
            .fetchPage({ page: pg, pageSize: 5 })
            .then((result) => {
            const data: ResData = {
              rawData: result.toArray(),
              pagination: result.pagination,
            };
            res.send(data);
          })
          .catch((err) => {
            res.status(500).json({ err: true, data: { message: err.message } });
          });
    });
  
    // 新規投稿用のPOST。{ title, date, content }を渡せばidは自動連番で振られる。
    server.post("/post_data/create/post", (req, res) => {
      corsHeader(res);
        const { title, date, content } = req.body;
        new PostData({
          title: title,
          date: date,
          content: content,
        })
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

     server.post("/post_data/get/singlepost", (req, res) => {
       corsHeader(res);
        new PostData().where('id', '=', req.body.id).fetch()
        .then((result) => {
            const data = { rawData: result };
            res.send(data)
        })
        .catch((err) => {            
            res.status(500).json({err: true, data:{message: err.message}})
        })         
    });

    //  編集した記事をアップデートする。
    server.post("/post_data/update/post", (req, res) => {
      corsHeader(res);
        const {id, title, date, content} = req.body

        new PostData().where('id',id)
        .save({
            title: title,
            date: date,
            content: content,
        },{patch:true})
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
     server.post("/post_data/delete/post", (req, res) => {
       corsHeader(res);
       const id = req.body.id;
       new PostData()
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
