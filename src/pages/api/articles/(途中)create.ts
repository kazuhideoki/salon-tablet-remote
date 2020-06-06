import { validationErrorHandle } from "../../../server/validation";
import { corsHeader } from "../../../server/server";

import { T_articles_create } from "../../../app/ActionCreator/articles/useCreateArticle";
import { T_articles_update } from "../../../app/ActionCreator/articles/useUpdateArticle";
import { ArticlesTable } from "../../../server/articles";
import { db } from "../../../lib/db";
import escape from "sql-template-strings";

// 新規投稿用のPOST。{ title, created_at, article_content }を渡せばidは自動連番で振られる。
export default async (req, res) => {
   if (req.method === "POST") {
    //  ↓？？？
     validationErrorHandle(req, res);
     corsHeader(res);

    const params: T_articles_create = req.body.params;
    const articles = await db(escape`
      INSERT INTO articles SET ${params}
    `);
    const pagination = await db(escape`
      SELECT
    `);


    res.status(200).json({
      rawData: articles,
      pagination: pagination,
    });
    // const initPagination = {
    //   page: 0,
    //   pageCount: 0,
    //   pageSize: 0,
    //   rowCount: 0,
    // };

    //  corsHeader(res);
    //  const params: T_articles_create = req.body.params;
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
   } else {
     // Handle any other HTTP method
   }
}