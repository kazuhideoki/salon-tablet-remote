import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts, T_user_id } from "../../../app/Store/Types";
import { TApiResponse } from "../../../lib/apiTypes";
import { server, localhost } from "../../../lib/loadUrl";
import { changeToBooleanFromNumberInstagramAcconts } from "../../../lib/changeToBooleanFromNumber";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsGet = async (user_id: T_user_id): Promise<TApiResponse<TInstagramAccounts>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/instagram_accounts/get?userId=${user_id}`);

  return await res.json();
} 

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  
  try {
    //@ts-ignore
    const data: TInstagramAccounts = await db(
      "SELECT instagram_id, username, profile_img, expires, user_id, created_at, updated_at FROM instagram_accounts WHERE user_id = ?",
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    const returnData: TInstagramAccounts = changeToBooleanFromNumberInstagramAcconts(data)

    return res.status(200).json(returnData);
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

export default get