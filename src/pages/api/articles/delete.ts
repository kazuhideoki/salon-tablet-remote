import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../config";
import { T_article_id } from "../../../app/Store/Types";
import { TApiResponse } from "../lib/apiTypes";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesDelete = async (params: T_articles_delete):Promise<TApiResponse<T_articles_delete_return>> => {
  const str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/articles/delete`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_articles_delete = {
  article_id: T_article_id
}
export type T_articles_delete_return = {
  rawData: unknown;
};



const articles_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { article_id }: T_articles_delete = req.body;

    try {
      const data = await db(
        `DELETE FROM articles WHERE article_id = ?`,
        article_id
      );
      console.log("/articles/delete/は " + JSON.stringify(data));

      const returnData: T_articles_delete_return = {
        rawData: data,
      };
      res.status(200).json(returnData);
      
    } catch (err) {
      console.log("/articles/delete/のエラーは " + JSON.stringify(err));

      res.status(500).json({ err: true, data: { message: err.message } });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default articles_delete