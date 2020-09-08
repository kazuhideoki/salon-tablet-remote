import { db } from "../../../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { checkPassword } from "../../../module/bcrypt";
import { T_user_email } from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoCheckCredentials = async (
  params: T_user_info_check_credentials
): Promise<TApiResponse<T_user_info_check_credentials_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/check_credentials`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
}; 

export type T_user_info_check_credentials = { email: T_user_email, password: string };

export type T_user_info_check_credentials_return = boolean

const check_credentials = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password }: T_user_info_check_credentials = req.body;

    // 念の為、パスワード未設定で、パスワード未入力ログインを弾く
    if (password === '') {
      return res.status(500).json({ err: true, data: { message: "パスワードが未入力です" } });
    }

    console.log("check_credentialsのreq.bodyは " + JSON.stringify(req.body));
    

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `select bcrypt_password from user_info where user_email = ?`,
        email
      );

      const result = await checkPassword(password, data[0].bcrypt_password);

      console.log("/user_info/check_credentials/は " + JSON.stringify(result));

      return res.status(200).json(result);
    } catch (err) {
      console.log(
        "/user_info/check_credentials/のエラーは " + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, data: { message: err.message } });
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

export default check_credentials