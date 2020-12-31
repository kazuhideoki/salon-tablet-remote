import { db } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_user_id, T_theme_font } from "../../../../app/Store/Types";
import { server, localhost } from "../../../../lib/loadUrl";
import { TApiResponse } from "../../../../lib/apiTypes";
import { apiWrapPost } from "../../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoThemeFont = async (
  params: T_user_info_theme_font
): Promise<TApiResponse<T_user_info_theme_font_return>> => {
  return apiWrapPost(params,"user_info/theme/font");
};

export type TWhichFont = "theme_font1" | "theme_font2" | "theme_font_heading";

export type T_user_info_theme_font = {
  user_id: T_user_id;
  theme_font: T_theme_font;
  whichFont: TWhichFont
};
export type T_user_info_theme_font_return = {
  rawData: unknown;
};

const font = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    const { user_id, theme_font, whichFont }: T_user_info_theme_font = req.body;

    // ※selectedTheme,
    //   paramsFromTheme,※全部一緒にしてupdate↓

    try {
      let data
      // if (whichFont === 'theme_font2') {
      //   data = await db(
      //     `UPDATE user_info SET theme_font2 = ? where user_id = ?`,
      //     [theme_font, user_id]
      //   );
      // } else {
      //   data = await db(
      //     `UPDATE user_info SET theme_font1 = ? where user_id = ?`,
      //     [theme_font, user_id]
      //   );
      // }
      data = await db(
          `UPDATE user_info SET ${whichFont} = ? where user_id = ?`,
          [theme_font, user_id]
        );

      const returnData: T_user_info_theme_font_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);
    } catch (err) {
      console.log("/user_info/theme/font/のエラーは " + JSON.stringify(err));
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

export default font;
