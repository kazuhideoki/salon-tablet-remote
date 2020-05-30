import { corsHeader } from "./server";
import { validationErrorHandle } from "./validation";
import mysqlPromise from "mysql2/promise";
import { TArticles, PaginationParams, T_id } from "../app/Store/Store";
import { T_articles_create } from "../app/ActionCreator/articles/useCreateArticle";
import { T_articles_update } from "../app/ActionCreator/articles/useUpdateArticle";

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

export type ResData = {
  rawData: TArticles;
  pagination: PaginationParams;
};

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// "/articles/get"
// 記事データとページネーションを返す
export const articles_get = async (req, res) => {
  corsHeader(res);

  const { page, isSetting } = req.body;
  console.log("/articles/getのreq.bodyは" + JSON.stringify(req.body));

  const connection = await mysqlPromise.createConnection(mysql_setting);

  try {
    // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
    let getPublishedOnly: string;
    if (isSetting === false) {
      // getPublishedOnly = `WHERE 'is_published' = true`
      getPublishedOnly = `WHERE is_published = true`;
    } else if (isSetting === true) {
      getPublishedOnly = "";
    }
    const skipRows = 5 * (page - 1); // オフセット, 何ページ飛ばすか
    const offSet = skipRows === 0 ? "" : skipRows + ","; // 冗長か？
    // const query = `SELECT * FROM 'articles' ${getPublishedOnly} ORDER BY 'created_at' DESC LIMIT ${offSet} 5`
    const query = `SELECT * FROM articles ${getPublishedOnly} ORDER BY created_at DESC LIMIT ${offSet} 5`;
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
        rowCount: result2.length,
      },
    };

    res.json(data);
  } catch (e) {
    console.log("/articles/getのエラーは " + e);
    res.status(500).json({ err: true, data: { message: e } });
  } finally {
    connection.end();
  }
}

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// "/articles/create"
// 新規投稿用のPOST。{ title, created_at, article_content }を渡せばidは自動連番で振られる。
export const articles_create = (req, res) => {
  validationErrorHandle(req, res);

  corsHeader(res);
  const params: T_articles_create = req.body.params;
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
}

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// "/articles/get/singlepost"
export const articles_get_singlepost = (req, res) => {
  corsHeader(res);
  const id: T_id = req.body.id;
  new ArticlesTable()
    .where("id", "=", id)
    .fetch()
    .then((result) => {
      const data = { rawData: result };
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({ err: true, data: { message: err.message } });
    });
}

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
//  編集した記事をアップデートする。
// "/articles/update"
export const articles_update = (req, res) => {
  validationErrorHandle(req, res);
  corsHeader(res);
  const params: T_articles_update = req.body.params;

  new ArticlesTable()
    .where("id", req.body.id)
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
}

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// Idを渡して多少のデータを削除する
// "/articles/delete",
export const articles_delete = (req, res) => {
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
}
