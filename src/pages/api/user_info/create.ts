import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { apiWrapPost } from "../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoCreate = async (
  params: T_user_info_create
): Promise<TApiResponse<T_user_info_create_return>> => {
  return apiWrapPost(params, "user_info/create");
};

export type T_user_info_create = {
  user_email: string;
};

export type T_user_info_create_return = {
  rawData: unknown;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const { user_email }: T_user_info_create = req.body;
    const params = { user_email };

    try {
      const data = await db(`INSERT INTO user_info (user_email) VALUES (?)`, [
        user_email,
      ]);

      const returnData: T_user_info_create_return = {
        rawData: data,
      };

      res.status(200).json(returnData);
    } catch (err) {
      console.log("/user_info/create/のエラーは " + JSON.stringify(err));

      return res.status(500).json({ err: true, data: err });
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
export default create;
