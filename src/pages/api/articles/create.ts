import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_id,
  T_article_excerpt,
  T_article_img,
  T_user_id,
  T_tag_ids,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../config";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesCreate = async (params: T_articles_create) => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/articles/create`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_articles_create = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string | null;
  user_id: T_user_id;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    const params: T_articles_create = req.body.params;

    try {
      const data = await db(`INSERT INTO articles SET ?`, params);
      console.log("/articles/create/は " + JSON.stringify(data));

      const data2: any = await db(`SELECT * FROM articles WHERE user_id = ?`, params.user_id);

      return res.status(200).json({
        rawData: data,
      });

    } catch (err) {
      console.log("/articles/create/のエラーは " + JSON.stringify(err));

      return res.status(500).json({ err: true, data: { message: err.message } });

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
