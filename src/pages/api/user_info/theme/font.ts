import { db } from "../../../../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../../module/bcrypt";
import { T_user_id, T_theme_font } from "../../../../app/Store/Types";
import { server, localhost } from "../../../../lib/loadUrl";
import { TApiResponse } from "../../../../lib/apiTypes";
import { TThemeParams } from "../../../../app/Store/ThemeContext";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoThemeFont = async (
  params: T_user_info_theme_font
): Promise<TApiResponse<T_user_info_theme_font_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/theme/font`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_user_info_theme_font = {
  user_id: T_user_id;
  theme_font: T_theme_font;
};
export type T_user_info_theme_font_return = {
  rawData: unknown;
};

const font = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id, theme_font }: T_user_info_theme_font = req.body;

    // ※selectedTheme,
    //   paramsFromTheme,※全部一緒にしてupdate↓

    try {
      const data = await db(
        `UPDATE user_info SET theme_font1 = ? where user_id = ?`,
        [theme_font, user_id]
      );

      console.log("theme/fontの返り値は " + JSON.stringify(data));

      const returnData: T_user_info_theme_font_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);
    } catch (err) {
      console.log("/user_info/theme/font/のエラーは " + JSON.stringify(err));
      return res
        .status(500)
        .json({ err: true, data: { message: err.message } });
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

export default font;
