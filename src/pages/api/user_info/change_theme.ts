import { db } from "../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../module/bcrypt";
import { T_user_id } from "../../../app/Store/Types";

export type T_change_theme = {
  user_id: T_user_id
  selectedTheme: string
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id, selectedTheme }: T_change_theme = req.body;

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `UPDATE user_info SET selected_theme = ? where user_id = ?`,
        [selectedTheme, user_id]
      );

      console.log(
        "change_themeの返り値は " +
          // JSON.stringify(data[0])
          JSON.stringify(data)
      );

      return res.status(200).json({
        rawData: data,
      });
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
