import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts, T_instagram_id, T_user_id } from "../../../app/Store/Types";
import { TApiResponse } from "../../../lib/apiTypes";
import { server, localhost } from "../../../lib/loadUrl";
import { apiWrapPost } from "../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsReconnectNeeded = async (
         params: T_instagram_accounts_reconnect_needed
       ): Promise<TApiResponse<
         T_instagram_accounts_reconnect_needed_return
       >> => {
         return apiWrapPost("instagram_accounts/reconnect_needed", params);
       };

export type T_instagram_accounts_reconnect_needed = {
  instagram_id: T_instagram_id;
  user_id: number,
  is_reconnect_needed: boolean
}
type T_instagram_accounts_reconnect_needed_return = {
  result: boolean
}


const reconnect_needed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log('reconnect_neededだよ')
    

    const {
      instagram_id, user_id,
      is_reconnect_needed,
    } = req.body as T_instagram_accounts_reconnect_needed;
    const isReconnectNeeded = is_reconnect_needed ? 1 : 0

    try {
      const data = await db(
        "UPDATE instagram_accounts SET is_reconnect_needed = ? WHERE instagram_id = ? AND user_id = ?",
        [isReconnectNeeded, instagram_id, user_id]
      );

      return res.status(200).json({result: true});
    } catch (err) {
      console.log("/instagram_accounts/reconnect_needed/のエラーは " + JSON.stringify(err));
      return res.status(500).json({ err: true, data: err });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default reconnect_needed;
