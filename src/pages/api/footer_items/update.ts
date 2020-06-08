import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const {params, id} = req.body;

    try {
      const data = await db(
        `UPDATE footer_items SET ? WHERE footer_item_id = ?`,
        [params, id]
      );

      console.log("/footer_items/update/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
    } catch (err) {
      console.log("/footer_items/update/のエラーは " + JSON.stringify(err));

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
      sizeLimit: '50mb',
    },
  },
};

