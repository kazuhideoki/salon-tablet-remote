import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
   const { footer_item_id, order } = req.body;
    try {
      // 右側のアイテムのorderを-1
      const date1 = await db(
        "UPDATE `footer_items` SET `order`=? WHERE `footer_item_id`=?",
        [order - 1, footer_item_id]
      );
      const date2 = await db(
        "UPDATE `footer_items` SET `order`=? WHERE `footer_item_id`!=? AND `order`=?",
        [order, footer_item_id, order - 1]
      );

      console.log(
        "/api/footer_items/switch_order " +
          JSON.stringify(date1) +
          " と " +
          JSON.stringify(date2)
      );

      res.status(200).json({ err: false });

    } catch (err) {
      console.log("/footer_items/switch_order/のエラーは " + JSON.stringify(err));

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

