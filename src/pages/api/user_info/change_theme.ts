import { db } from "../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../module/bcrypt";
import { T_user_id } from "../../../app/Store/Types";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeTheme = async (params: T_user_info_change_theme):Promise<TApiResponse<T_user_info_change_theme_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/user_info/change_theme`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_user_info_change_theme = {
  user_id: T_user_id
  selectedTheme: string
};
export type T_user_info_change_theme_return = {
  rawData: unknown;
};

const change_theme = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id, selectedTheme }: T_user_info_change_theme = req.body;

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `UPDATE user_info SET selected_theme = ? where user_id = ?`,
        [selectedTheme, user_id]
      );

      console.log(
        "change_themeの返り値は " +
          JSON.stringify(data)
      );

      const returnData: T_user_info_change_theme_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);

    } catch (err) {
      console.log(
        "/user_info/change_theme/のエラーは " + JSON.stringify(err)
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

export default change_theme