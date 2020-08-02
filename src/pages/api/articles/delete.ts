import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const article_id = req.body.article_id;

    try {
      const data = await db(
        `DELETE FROM articles WHERE article_id = ?`,
        article_id
      );
      console.log("/articles/delete/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
      
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
