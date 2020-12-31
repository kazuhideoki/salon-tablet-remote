import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_info_bar_type,
  T_scrolling_sentence,
  T_selected_article_id,
  T_user_id,
  T_scrolling_animation_duration,
} from "../../../app/Store/Interface";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { apiWrapPost } from "../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarUpdate = async (
  params: T_info_bar_update
): Promise<TApiResponse<T_info_bar_update_return>> => {
  return apiWrapPost("info_bar/update", params);
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
      sizeLimit: "50mb",
    },
  },
};

export default update;
