import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { T_user_id } from "../../../app/Store/Types";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoDelete = async (
  params: T_user_info_delete
): Promise<TApiResponse<T_user_info_delete_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/delete`, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://salon-tablet.an.r.appspot.com", },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_user_info_delete = {
  user_id: T_user_id;
};
export type T_user_info_delete_return = {
  rawData: unknown;
};

const user_info_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user_id: T_user_info_delete = req.body;

    try {
      const data = await db(
        "DELETE FROM `user_info` WHERE `user_id`=?",
        user_id
      );

      const data2 = await db(
        "DELETE FROM `users` WHERE `id`=?",
        user_id
      );

      const data3 = await db(
        "DELETE FROM `articles` WHERE `user_id`=?",
        user_id
      );

      const data4 = await db(
        "DELETE FROM `footer_items` WHERE `user_id`=?",
        user_id
      );

      const data5 = await db(
        "DELETE FROM `tags` WHERE `user_id`=?",
        user_id
      );

      const data6 = await db(
        "DELETE FROM `instagram_accounts` WHERE `user_id`=?",
        user_id
      );
      
      console.log("/user_info/delete/は " + JSON.stringify({data, data2}));

      const returnData: T_user_info_delete_return = {
        rawData: data,
      };
      res.status(200).json(returnData);

    } catch (err) {
      console.log("/user_info/delete/のエラーは " + JSON.stringify(err));

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

export default user_info_delete