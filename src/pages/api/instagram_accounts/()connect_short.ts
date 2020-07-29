import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts } from "../../../app/Store/Store";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  try {

    const data = await fetch(
      `https://api.instagram.com/oauth/authorize?client_id=298521954536312&redirect_uri=https://salon-tablet.com/connect_instagram_account/&scope=user_profile,user_media&response_type=code`
    );

    return res.status(200).json(data);

  } catch (err) {
    console.log("/instagram_accounts/connect/のエラーは " + JSON.stringify(err));
    return res.status(500).json({ err: true, data: { message: err.message } });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};
