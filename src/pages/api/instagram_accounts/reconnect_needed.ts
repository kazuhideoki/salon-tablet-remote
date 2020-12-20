import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts, T_instagram_id, T_user_id } from "../../../app/Store/Types";
import { TApiResponse } from "../../../lib/apiTypes";
import { server, localhost } from "../../../lib/loadUrl";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsReconnectNeeded = async (
         params: T_instagram_accounts_reconnect_needed
       ): Promise<TApiResponse<
         T_instagram_accounts_reconnect_needed_return
       >> => {
         let str = process.browser ? server : localhost;

         const res = await fetch(
           `${str}/api/instagram_accounts/reconnect_needed`,
           {
             headers: { "Content-Type": "application/json" },
             method: "POST",
             mode: "cors",
             body: JSON.stringify(params),
           }
         );

         return await res.json();
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
      return res.status(500).json({ err: true, result: false, data: { message: err.message } });
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
