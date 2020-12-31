import { db } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_user_id } from "../../../../app/Store/Interface";
import { server, localhost } from "../../../../lib/loadUrl";
import { TApiResponse } from "../../../../lib/apiTypes";
import { TThemeParams } from "../../../../app/Store/theme/ThemeProvider";
import { apiWrapPost } from "../../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeTheme = async (params: T_user_info_change_theme):Promise<TApiResponse<T_user_info_change_theme_return>> => {
  return apiWrapPost("user_info/theme/change_theme", params);
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

    const { user_id, themeParams }: T_user_info_change_theme = req.body;

    try {
      const data = await db(`UPDATE user_info SET ? where user_id = ?`, [
        themeParams,
        user_id,
      ]);

      const returnData: T_user_info_change_theme_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);

    } catch (err) {
      console.log(
        "/user_info/change_theme/のエラーは " + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, data: err });
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