import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_user_id,
  TInfoBar,
  T_selected_article_id,
  TInfoBarWithoutId,
} from "../../../app/Store/Types";
import { TApiResponse } from "../lib/apiTypes";
import { server, localhost } from "../../../config";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCreateInfoBar = async (
  params: T_info_bar_create
): Promise<TApiResponse<void>> => {
  const str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/info_bar/create_init`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_info_bar_create = {
  user_id: T_user_id;
};

const info_bar_create_init = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    console.log("create_info_bar.tsだよ");

    const { user_id }: T_info_bar_create = req.body;

    try {

      const params: TInfoBarWithoutId = {
        user_id: user_id,
        info_bar_type: "shop_name",
        scrolling_sentence: "",
        scrolling_animation_duration: 8,
        selected_article_id: null as T_selected_article_id,
      };

      await db(`INSERT INTO info_bar SET ?`, params)
    
      res.end();

    } catch (err) {
      console.log("/create_info_barのエラーは " + JSON.stringify(err));
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

export default info_bar_create_init
