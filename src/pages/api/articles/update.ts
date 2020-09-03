import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../../../lib/apiTypes";
import {
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_id,
  T_article_excerpt,
  T_article_img,
  T_data_type_article,
} from "../../../app/Store/Types";
import { T_articles_create } from "./create";
import { checkIsAdmin } from "../../../lib/checkIsAdmin";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesUpdate = async (params: T_articles_update):Promise<TApiResponse<T_articles_update_return>> => {
  const str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/articles/update`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_articles_update_params = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string | null;
  data_type: T_data_type_article;
};
// dbに そのまま入れられるように paramsとwhereに使うidは分けておく
export type T_articles_update = {
  params: T_articles_update_params;
  article_id: T_article_id;
};
export type T_articles_update_return = {
  rawData: unknown;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { params }: T_articles_update = req.body;
    const id: T_article_id = req.body.article_id;

    try {
      const isAdmin = await checkIsAdmin(req);

      if (isAdmin === false) {
        params.data_type = "default_data";
      }

      const data = await db(`UPDATE articles SET ? WHERE article_id = ?`, [
        params,
        id,
      ]);
      console.log("/articles/update/は " + JSON.stringify(data));

      const returnData: T_articles_update_return = {
        rawData: data,
      };
      res.status(200).json(returnData);
      
    } catch (err) {
      console.log("/articles/update/のエラーは " + JSON.stringify(err));

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

export default update