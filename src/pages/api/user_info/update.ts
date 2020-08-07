import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cipher } from "../../../module/bcrypt";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";
import { T_user_id, T_user_name, T_shop_name, T_user_email } from "../../../app/Store/Types";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoUpdate = async (
  params: T_user_info_update
): Promise<TApiResponse<T_user_info_update_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/update`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_user_info_update = {
  columns: {
    user_id: T_user_id;
    user_name: T_user_name;
    shop_name: T_shop_name;
    user_email: T_user_email;
  },
  plainTextPassword: string
};
export type T_user_info_update_return = {
  rawData: unknown;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { columns, plainTextPassword }: T_user_info_update = req.body;

    let params
    if (plainTextPassword === "") {
      params = columns

    } else {
      // sqlに入れる用のparamsを,bcryptとともに生成し直す
      const bcrypt = await cipher(plainTextPassword);    
      params = {
        bcrypt_password: bcrypt,
        user_id: columns.user_id,
        user_name: columns.user_name,
        shop_name: columns.shop_name,
        user_email: columns.user_email,
      }

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
