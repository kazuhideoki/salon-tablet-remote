import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TTags, T_user_id } from "../../../app/Store/Types";
import { server, localhost } from "../../../config";
import { TApiResponse, TApiError } from "../../../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsGet = async (user_id: T_user_id): Promise<TApiResponse<TTags>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(
      `${str}/api/tags/get?userId=${user_id}`
  )

  return await res.json();
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    const data: TTags = await db(
      "SELECT * FROM tags WHERE user_id = ?",
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    // console.log("/tags/get/は " + JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    console.log("/tags/get/のエラーは " + JSON.stringify(err));
    const errOnj: TApiError = { err: true, data: { message: err.message } };
    return res.status(500).json(errOnj);
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get