import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts } from "../../../app/Store/Store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    const data: TInstagramAccounts = await db(
      "SELECT * FROM instagram_accounts WHERE user_id = ?",
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    console.log("/instagram_accounts/get/は " + JSON.stringify(data));

    return res.status(200).json({
      rawData: data,
    });
  } catch (err) {
    console.log("/instagram_accounts/get/のエラーは " + JSON.stringify(err));
    return res.status(500).json({ err: true, data: { message: err.message } });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};
