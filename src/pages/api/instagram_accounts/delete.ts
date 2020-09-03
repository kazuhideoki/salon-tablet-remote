import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_instagram_id } from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsDelete = async (params: T_instagram_accounts_delete ):Promise<TApiResponse<T_instagram_accounts_delete_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/instagram_accounts/delete`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_instagram_accounts_delete = {
  instagram_id: T_instagram_id
}
export type T_instagram_accounts_delete_return = {
  rawData: unknown;
};

const instagram_accounts_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { instagram_id }: T_instagram_accounts_delete = req.body;

    try {
      const data = await db(
        `DELETE FROM instagram_accounts WHERE instagram_id = ?`,
        instagram_id
      );
      console.log("/instagram_accounts/delete/は " + JSON.stringify(data));

      const returnData: T_instagram_accounts_delete_return = {
        rawData: data,
      };
      res.status(200).json(returnData);
    } catch (err) {
      console.log("/instagram_accounts/delete/のエラーは " + JSON.stringify(err));

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

export default instagram_accounts_delete