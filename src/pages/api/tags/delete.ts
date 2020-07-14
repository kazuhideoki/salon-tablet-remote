import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const tag_id = req.body.tag_id;

    try {
      const data = await db(
        `DELETE FROM tags WHERE tag_id = ?`,
        tag_id
      );
      console.log("/tags/delete/は " + JSON.stringify(data));

      return res.status(200).json({
        rawData: data,
      });
    } catch (err) {
      console.log("/tags/delete/のエラーは " + JSON.stringify(err));

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
