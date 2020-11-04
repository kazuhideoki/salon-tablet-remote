import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cipher } from "../../../module/bcrypt";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { T_user_id, T_user_name, T_shop_name, T_user_email, T_is_generate_public_page } from "../../../app/Store/Types";
import { runMiddleware } from "../../../module/corsSetting";

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

export type T_user_info_columns_without_password = {
  user_id: T_user_id;
  user_name: T_user_name;
  shop_name: T_shop_name;
  user_email: T_user_email;
  is_generate_public_page: T_is_generate_public_page
}

export type T_user_info_update = {
  columns: T_user_info_columns_without_password;
  plainTextPassword: string;
};
type T_user_info_update_params = T_user_info_columns_without_password & {bcrypt_password?: any }


export type T_user_info_update_return = {
  rawData: unknown;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    const { columns, plainTextPassword }: T_user_info_update = req.body;

    const params: T_user_info_update_params = columns;
    // パスワード変更がある場合暗号化してparamsに格納
    if (plainTextPassword.length) {
      const bcrypt = await cipher(plainTextPassword);
      params.bcrypt_password = bcrypt;
    }
        
    console.log("/user_info/update/のsqlに入れるparamsは " + JSON.stringify(params));

    try {
      const data = await db(`UPDATE user_info SET ? WHERE user_id = ?`, [
        params,
        columns.user_id,
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