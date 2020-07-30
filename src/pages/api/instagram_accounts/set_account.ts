import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { tagIdsParse } from "../lib/tagIdsParse";
import { T_user_id } from "../../../app/Store/Store";
// import { session } from "next-auth/client";

export type T_articles_get = {
  page: number;
  selectingTags: number[];
  isSetting: boolean;
  userId: T_user_id;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("/instagram_accounts/set_account/だよ");

  const params = {
    
  }
  
    try {

      const data = await db(`INSERT INTO footer_items SET ?`, params);
   

      
      // 最後に homeへもどる
    } catch (err) {
      console.log("/instagram_accounts/set_account/のエラーは " + JSON.stringify(err));

      return res
        .status(500)
        .json({ err: true, data: { message: err.message } });
    }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
  },
};
