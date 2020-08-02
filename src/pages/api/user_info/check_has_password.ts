import { db } from "../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id } = req.body;

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `select bcrypt_password from user_info where user_id = ?`,
        user_id
      );

      console.log(
        "check_has_passwordの返り値は " + JSON.stringify(data[0].bcrypt_password)
      );

      // パスワードが設定されていたらtrueを返す
      if (data[0].bcrypt_password) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }


    } catch (err) {
      console.log(
        "/user_info/check_has_password/のエラーは " + JSON.stringify(err)
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
