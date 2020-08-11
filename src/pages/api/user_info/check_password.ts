import { db } from "../lib/db";
const bcrypt = require("bcryptjs"); 
import { NextApiRequest, NextApiResponse } from "next";
import { cipher,checkPassword } from "../../../module/bcrypt";
import { T_user_id } from "../../../app/Store/Types";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoCheckPassword = async (params: T_user_info_check_password):Promise<TApiResponse<T_user_info_check_password_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/user_info/check_password`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_user_info_check_password = {
  user_id: T_user_id;
  password: string;
};
export type T_user_info_check_password_return = boolean

const check_password = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id, password }: T_user_info_check_password = req.body;

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(`select bcrypt_password from user_info where user_id = ?`, user_id);
      
      // パスワード未設定で、パスワード未入力でのチェックはtrueを返す
      if (data[0].bcrypt_password === null && password === '') {
        res.status(200).json(true);
      } else {

        const result = await checkPassword(password, data[0].bcrypt_password)
  
        console.log(
          "/user_info/check_password/は " + JSON.stringify(result)
        );
  
        res.status(200).json(result);
      }

    } catch (err) {
      console.log(
        "/user_info/check_password/のエラーは " + JSON.stringify(err)
      );
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

export default check_password