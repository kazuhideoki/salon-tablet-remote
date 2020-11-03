import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_info_bar_id,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
  T_item_excerpt,
  T_app_link_url,
  T_modal_size,
  T_info_bar_type,
  T_scrolling_sentence,
  T_selected_article_id,
  T_user_id,
  T_scrolling_animation_duration,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { checkIsAdmin } from "../../../lib/checkIsAdmin";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarUpdate = async (
  params: T_info_bar_update
): Promise<TApiResponse<T_info_bar_update_return>> => {
  // console.log("apiInfoBarUpdateだよ " + params);
  
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/info_bar/update`, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://salon-tablet.an.r.appspot.com", },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_info_bar_update = {
  user_id: T_user_id;
  info_bar_type: T_info_bar_type;
  scrolling_sentence: T_scrolling_sentence;
  scrolling_animation_duration: T_scrolling_animation_duration
  selected_article_id: T_selected_article_id;
};

export type T_info_bar_update_return = {
  rawData: unknown;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const params: T_info_bar_update = req.body;

    try {

      const data = await db(`UPDATE info_bar SET ? WHERE user_id = ?`, [
        params,
        params.user_id,
      ]);

      console.log("/info_bar/update/は " + JSON.stringify(data));

      const returnData = {
        rawData: data,
      };
      res.status(200).json(returnData);
    } catch (err) {
      console.log("/info_bar/update/のエラーは " + JSON.stringify(err));

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

export default update;
