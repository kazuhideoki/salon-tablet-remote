import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { T_user_id, T_user_name, T_shop_name, T_user_email, T_is_generate_public_page } from "../../../app/Store/Types";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoUpdate = async (
  params: T_user_info_update
): Promise<TApiResponse<T_user_info_update_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/update`, {
    headers: { "Content-Type": "application/json"},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_user_info_update = {
  user_id: T_user_id;
  user_name: T_user_name;
  shop_name: T_shop_name;
  user_email: T_user_email;
  is_generate_public_page: T_is_generate_public_page
}

export type T_user_info_update_return = {
  rawData: unknown;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const params: T_user_info_update = req.body;

    try {
      const data = await db(`UPDATE user_info SET ? WHERE user_id = ?`, [
        params,
        params.user_id,
      ]);
      console.log("/user_info/update/は " + JSON.stringify(data));

      const returnData: T_user_info_update_return = {
        rawData: data,
      };
      
      res.status(200).json(returnData);

    } catch (err) {
      console.log("/user_info/update/のエラーは " + JSON.stringify(err));

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
export default update