import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsSwitchOrder = async (params:T_footer_items_switch_order):Promise<TApiResponse<T_footer_items_switch_order_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/footer_items/switch_order`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
}

export type T_footer_items_switch_order = {
  footer_item_id: number;
  order: number;
};

export type T_footer_items_switch_order_return = { err: boolean };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
   const { footer_item_id, order }: T_footer_items_switch_order = req.body;

    // orderが連番じゃなかったらエラー出す

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
      
      const returnData: T_footer_items_switch_order_return = { err: false }

      res.status(200).json(returnData);

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

