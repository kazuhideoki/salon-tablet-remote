import { db } from "../lib/db";
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
  T_selected_article_on_info_bar,
  T_user_id,
  TInfoBar,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";
import { checkIsAdmin } from "../lib/checkIsAdmin";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCheckHasInfoBar = async (
  params: T_check_has_info_bar
): Promise<TApiResponse<T_check_has_info_bar_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/info_bar/check_has_info_bar`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_check_has_info_bar = {
  user_id: T_user_id;
};

export type T_check_has_info_bar_return = boolean

const check_has_info_bar = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {user_id}: T_check_has_info_bar = req.body;

    try {
      const data: any = await db(`SELECT * FROM info_bar WHERE user_id = ?`, user_id);

      console.log("/info_bar/check_has_info_bar/は " + JSON.stringify(data));

      const returnData = data.length !== 0

      res.status(200).json(returnData);

    } catch (err) {
      console.log("/info_bar/check_has_info_bar/のエラーは " + JSON.stringify(err));

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

export default check_has_info_bar;
