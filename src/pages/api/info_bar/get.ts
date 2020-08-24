import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkOrders } from "../lib/checkOrders";
import { TInfoBar, T_user_id } from "../../../app/Store/Types";
import { correctOrders } from "../lib/correctOrders";
import { changeToBooleanFromNumber } from "../lib/changeToBooleanFromNumber";
import { localhost, server } from "../../../config";
import { TApiResponse, TApiError } from "../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarGet = async (
  user_id: T_user_id
): Promise<TApiResponse<TInfoBar>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/info_bar/get?userId=${user_id}`);

  return await res.json();
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    const data: TInfoBar = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      "SELECT * FROM info_bar WHERE user_id = ?",
      // queryは文字列で来るため
      Number(req.query.userId)
    );


    return res.status(200).json(data[0]);

  } catch (err) {
    console.log("/info_bar/get/のエラーは " + JSON.stringify(err));
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

export default get;
