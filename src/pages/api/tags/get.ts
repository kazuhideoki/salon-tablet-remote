import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TTags, T_user_id } from "../../../app/Store/Interface";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse, TApiError } from "../../../lib/apiTypes";
import { apiWrapGet } from "../../../lib/apiWrap";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsGet = async (user_id: T_user_id): Promise<TApiResponse<TTags>> => {
  return apiWrapGet(`tags/get?userId=${user_id}`);
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  
  try {
    //@ts-ignore
    const data: TTags = await db(
      "SELECT * FROM tags WHERE user_id = ?",
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    return res.status(200).json(data);
  } catch (err) {
    console.log("/tags/get/のエラーは " + JSON.stringify(err));
    return res.status(500).json({ err: true, data: err });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get