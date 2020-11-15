import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_footer_item_id,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { checkIsAdmin } from "../../../lib/checkIsAdmin";
import { T_footer_items_params } from "./create";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsUpdate = async (params: T_footer_items_update):Promise<TApiResponse<T_footer_items_update_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/footer_items/update`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });
  console.log('strは ' + str)

  return await res.json();
}

export type T_footer_items_update_params = T_footer_items_params
export type T_footer_items_update = {
  params: T_footer_items_update_params;
  id: T_footer_item_id;
};

export type T_footer_items_update_return = {
  rawData: unknown;
};


const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const { params, id }: T_footer_items_update = req.body;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = "default_data";
      }

      const data = await db(
        `UPDATE footer_items SET ? WHERE footer_item_id = ?`,
        [params, id]
      );

      console.log("/footer_items/update/は " + JSON.stringify(data));

      const returnData = {
        rawData: data,
      };
      res.status(200).json(returnData);
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

export default update