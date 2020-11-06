import { db } from "../../../../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../../module/bcrypt";
import { T_user_id } from "../../../../app/Store/Types";
import { server, localhost } from "../../../../lib/loadUrl";
import { TApiResponse } from "../../../../lib/apiTypes";
import { TThemeParams } from "../../../../app/Store/ThemeContext";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeTheme = async (params: T_user_info_change_theme):Promise<TApiResponse<T_user_info_change_theme_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/user_info/theme/change_theme`, {
    headers: { "Content-Type": "application/json"},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_user_info_change_theme = {
  user_id: T_user_id;
  themeParams: TThemeParams;
}; 
export type T_user_info_change_theme_return = {
  rawData: unknown;
};

const change_theme = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    const { user_id, themeParams }: T_user_info_change_theme = req.body;

    // ※selectedTheme,
    //   paramsFromTheme,※全部一緒にしてupdate↓

    try {
      const data = await db(`UPDATE user_info SET ? where user_id = ?`, [
        themeParams,
        user_id,
      ]);

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