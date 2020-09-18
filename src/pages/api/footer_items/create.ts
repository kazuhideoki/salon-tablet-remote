import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_is_published_footer_items,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
  T_item_excerpt,
  T_app_link_url,
  T_user_id,
  T_modal_size,
  T_data_type_footer_item,
  T_on_sidebar,
  T_order_sidebar,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { checkIsAdmin } from "../../../lib/checkIsAdmin";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsCreate = async (params:T_footer_items_create):Promise<TApiResponse<T_footer_items_create_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/footer_items/create`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
}

export type T_footer_items_params = {
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content;
  item_excerpt: T_item_excerpt;
  link_url: T_link_url;
  app_link_url: T_app_link_url;
  modal_size: T_modal_size;
  on_sidebar: T_on_sidebar
  order: T_order;
  order_sidebar: T_order_sidebar
  data_type: T_data_type_footer_item
};

export type T_footer_items_create = T_footer_items_params & {
  user_id: T_user_id;
};

export type T_footer_items_create_return = {
  rawData: unknown;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === "POST") {

    const params: T_footer_items_create = req.body;

    try {
      const isAdmin = await checkIsAdmin(req);

      if (isAdmin === false) {
        params.data_type = "default_data";
      }

      console.log(
        'dbに入れる直前のparamsは ' + JSON.stringify(params)
      );
      

      const data = await db(`INSERT INTO footer_items SET ?`, params);
  
      console.log("/footer_items/create/は " + JSON.stringify(data));
  
      const returnData: T_footer_items_create_return = {
        rawData: data,
      };
      res.status(200).json(returnData);

    } catch (err) {

      console.log("/footer_items/create/のエラーは " + JSON.stringify(err));

      res.status(500).json({ err: true, data: { message: err.message } });

    }

  } else if (req.method === "GET") {
    console.log("GETだよ");
    
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

export default create;