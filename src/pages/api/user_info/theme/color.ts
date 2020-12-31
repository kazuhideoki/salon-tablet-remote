import { db } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_user_id, T_theme_color } from "../../../../app/Store/Types";
import { server, localhost } from "../../../../lib/loadUrl";
import { TApiResponse } from "../../../../lib/apiTypes";
import { apiWrapPost } from "../../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoThemeColor = async (
         params: T_user_info_theme_color
       ): Promise<TApiResponse<T_user_info_theme_color_return>> => {
         return apiWrapPost("user_info/theme/color", params);
       };

export type T_user_info_theme_color = {
  user_id: T_user_id;
  theme_color: T_theme_color;
};
export type T_user_info_theme_color_return = {
  rawData: unknown;
};

const color = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    const { user_id, theme_color }: T_user_info_theme_color = req.body;

    // ※selectedTheme,
    //   paramsFromTheme,※全部一緒にしてupdate↓

    try {
      const data = await db(`UPDATE user_info SET theme_color = ? where user_id = ?`, [
        theme_color,
        user_id,
      ]);

      console.log("theme/colorの返り値は " + JSON.stringify(data));

      const returnData: T_user_info_theme_color_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);
    } catch (err) {
      console.log("/user_info/theme/color/のエラーは " + JSON.stringify(err));
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

export default color;
