import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const { footer_item_id, order } = req.body;

    try {
      const data = await db(
        `DELETE FROM footer_items WHERE footer_item_id = ?`,
        footer_item_id
      );
      const data2 = await db(
        `UPDATE footer_items SET order = order - 1 WHERE order > ? `,
        order
      );


      console.log("/footer_items/delete/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data2,
      });

    } catch (err) {
      console.log("/footer_items/delete/のエラーは " + JSON.stringify(err));

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

