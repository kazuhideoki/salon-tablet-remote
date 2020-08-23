import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_footer_item_id,
  T_is_published_footer_items,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
  T_item_excerpt,
  T_app_link_url,
  T_modal_size,
  T_data_type_footer_item,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";
import { checkIsAdmin } from "../lib/checkIsAdmin";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsUpdate = async (params: T_footer_items_update):Promise<TApiResponse<T_footer_items_update_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/footer_items/update`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
}

export type T_footer_items_update_params = {
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content;
  item_excerpt: T_item_excerpt;
  link_url: T_link_url;
  app_link_url: T_app_link_url;
  modal_size: T_modal_size;
  order: T_order;
  data_type: T_data_type_footer_item,
};
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
      const isAdmin = await checkIsAdmin(req);

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