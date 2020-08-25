import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkOrders } from "../lib/checkOrders";
import { TInfoBar, T_user_id, TArticle } from "../../../app/Store/Types";
import { correctOrders } from "../lib/correctOrders";
import { changeToBooleanFromNumber } from "../lib/changeToBooleanFromNumber";
import { localhost, server } from "../../../config";
import { TApiResponse, TApiError } from "../lib/apiTypes";
import { T_info_bar_update_return } from "./update";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarGet = async (
         user_id: T_info_bar_get
       ): Promise<TApiResponse<T_info_bar_get_return>> => {
         let str = process.browser ? server : localhost;

         const res = await fetch(`${str}/api/info_bar/get?userId=${user_id}`);

         return await res.json();
       };

export type T_info_bar_get = T_user_id
export type T_info_bar_get_return = {
  rawData: TInfoBar
  targetArticle: TArticle
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId:T_info_bar_get = Number(req.query.userId)

  try {
    //@ts-ignore
    const data: TInfoBar[] = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      "SELECT * FROM info_bar WHERE user_id = ?",
      userId
    );
    console.log('info_bar/getのdataは ' + JSON.stringify(data));

    const article_id = data[0].selected_article_on_info_bar;

    // selected_article_on_info_barがセットされていれば該当記事取得
    let data2 = [] as any
    if (article_id) {
      data2 = await db(
        `SELECT * FROM articles WHERE article_id = ?`,
        article_id
      );
    }

    console.log("info_bar/getのdata2は " + JSON.stringify(data2));

    const returnData: T_info_bar_get_return = {
      rawData: data[0],
      targetArticle: data2.length ? data2[0] : [],
    }

    return res.status(200).json(returnData);

  } catch (err) {
    console.log("/info_bar/get/のエラーは " + JSON.stringify(err));
    const errOnj: TApiError = { err: true, data: { message: err.message } };
    return res.status(500).json(errOnj);
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
