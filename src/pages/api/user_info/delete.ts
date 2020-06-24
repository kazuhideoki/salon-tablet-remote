import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user_id = req.body;

    try {
      const data = await db(
        "DELETE FROM `user_info` WHERE `user_id`=?",
        user_id
      );

      const data2 = await db(
        "DELETE FROM `users` WHERE `id`=?",
        user_id
      );
      
      console.log("/user_info/delete/は " + JSON.stringify({data, data2}));

      res.status(200).json({
        rawData: data,
      });
    } catch (err) {
      console.log("/user_info/delete/のエラーは " + JSON.stringify(err));

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
