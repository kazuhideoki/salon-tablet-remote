import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_articles_create } from "../../../app/ActionCreator/articles/useCreateArticle";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    const params: T_articles_create = req.body.params;

    try {
      const data = await db(`INSERT INTO articles SET ?`, params);
      console.log("/articles/create/は " + JSON.stringify(data));

      const data2: any = await db(`SELECT * FROM articles WHERE user_id = ?`, params.user_id);

      res.status(200).json({
        rawData: data,
        pagination: {
          page: 1,
          pageCount: Math.ceil(data2.length / 5), // 全row数を5で割って切り上げ
          pageSize: 5,
          rowCount: data2.length,
        },
      });

    } catch (err) {
      console.log("/articles/create/のエラーは " + JSON.stringify(err));

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
