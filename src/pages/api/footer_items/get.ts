import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      "SELECT * FROM footer_items WHERE user_id = ? ORDER BY `order` ASC",
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    console.log("/footer_items/get/は " + JSON.stringify(data));

    res.status(200).json({
      rawData: data,
    });
  } catch (err) {
    console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
    res.status(500).json({ err: true, data: { message: err.message } });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};
