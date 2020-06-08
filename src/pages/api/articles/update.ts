import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_articles_create } from "../../../app/ActionCreator/articles/useCreateArticle";
import { T_articles_update } from "../../../app/ActionCreator/articles/useUpdateArticle";
import { T_id } from "../../../app/Store/Store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const params: T_articles_update = req.body.params;
    const id: T_id = req.body.id;

    try {
      const data = await db(`UPDATE articles SET ? WHERE id = ?`, [params, id]);
      console.log("/articles/update/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
      
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
