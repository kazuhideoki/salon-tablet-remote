import express from "express";
import next from "next";
import mysqlPromise from "mysql2/promise";
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

const mysql_setting = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "salon_tablet",
};


export function corsHeader(res) {
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

    // なにかのエラー対応→{ limit: "50mb" }
    server.use(bodyParser.json({ limit: "50mb" }));
    server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    // 記事データとページネーションを返す
    server.post("/articles/get", async (req, res) => {
      corsHeader(res);

      const { page, isSetting } = req.body;
      console.log("/articles/getのreq.bodyは" + JSON.stringify(req.body));

      const connection = await mysqlPromise.createConnection(mysql_setting);

      try {
        // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
        let getPublishedOnly: string
        if (isSetting === false ) {
          // getPublishedOnly = `WHERE 'is_published' = true`
          getPublishedOnly = `WHERE is_published = true`
        } else if (isSetting === true) {
          getPublishedOnly = ''
        }
        const skipRows = 5 * (page - 1) // オフセット, 何ページ飛ばすか
        const offSet = (skipRows === 0? '' : skipRows + ',') // 冗長か？
        // const query = `SELECT * FROM 'articles' ${getPublishedOnly} ORDER BY 'created_at' DESC LIMIT ${offSet} 5`
        const query = `SELECT * FROM articles ${getPublishedOnly} ORDER BY created_at DESC LIMIT ${offSet} 5`
        console.log(JSON.stringify(query));
        
        // const [result, fields] = await connection.query(query, skip);
        const [result, fields] = await connection.query(query);
        // const query2 = `SELECT * FROM 'articles' ${getPublishedOnly}`;
        const query2 = `SELECT * FROM articles ${getPublishedOnly}`;
        const [result2] = await connection.query(query2);

        const data: ResData = {
          rawData: result,
          pagination: {
            page: page,
            pageCount: Math.ceil(result2.length / 5), // 全row数を5で割って切り上げ
            pageSize: 5,
            rowCount: result2.length
          }
        };

        res.json(data);
       
      } catch (e) {
        console.log("/articles/getのエラーは " + e);
        res.status(500).json({ err: true, data: { message: e } });
      } finally {
        connection.end();
      }
    })

  
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

    server.get("/footer_items/get", (req, res) => footer_items_get(req, res));
    server.post("/footer_items/create/item", (req, res) =>
      footer_items_create_item(req, res)
    );
    server.post("/footer_items/get/single", (req, res) =>
      footer_items_get_single(req, res)
    );
    server.post("/footer_items/update/item", (req, res) =>
      footer_items_update_item(req, res)
    );
    server.post("/footer_items/delete/item", (req, res) =>
      footer_items_delete_item(req, res)
    );
    server.post("/footer_items/switchOrder", (req, res) =>
      footer_items_switchOrder(req, res)
    );

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
