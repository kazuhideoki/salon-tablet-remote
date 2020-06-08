import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_articles_create } from "../../../app/ActionCreator/articles/useCreateArticle";
import { T_articles_update } from "../../../app/ActionCreator/articles/useUpdateArticle";
import { T_id } from "../../../app/Store/Store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const id = req.body.id;

    try {
      const data = await db(
        `DELETE FROM articles WHERE id = ?`,
        id
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
