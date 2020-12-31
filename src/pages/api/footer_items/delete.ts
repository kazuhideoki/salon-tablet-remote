import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { T_footer_item_id, T_order } from "../../../app/Store/Types";
import { TApiResponse } from "../../../lib/apiTypes";
import { apiWrapPost } from "../../../lib/apiWrap";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsDelete = async (params:T_footer_items_delete):Promise<TApiResponse<T_footer_items_delete_return>> => {
  return apiWrapPost("footer_items/delete", params);
}

export type T_footer_items_delete = {
  footer_item_id: T_footer_item_id,
  order: T_order
}

export type T_footer_items_delete_return = {
  rawData: unknown;
};

const footer_items_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const { footer_item_id, order }:T_footer_items_delete = req.body;

    try {
      const data = await db(
        "DELETE FROM `footer_items` WHERE `footer_item_id`=?",
        footer_item_id
      );
      // 残ったアイテムのorderを調整するため
      const data2 = await db(
        " UPDATE `footer_items` SET `order` = `order` -1 WHERE `order` > ? ",
        order
      );
      // UPDATE `footer_items` SET `order` = `order` -1 WHERE `order` > ?


      console.log("/footer_items/delete/は " + JSON.stringify(data));

      const returnData: T_footer_items_delete_return = {
        rawData: data2,
      };
      res.status(200).json(returnData);

    } catch (err) {
      console.log("/footer_items/delete/のエラーは " + JSON.stringify(err));

      return res.status(500).json({ err: true, data: err });
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

export default footer_items_delete;