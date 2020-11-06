import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_tag_id, T_tag_name,
} from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsUpdata = async (
  params: T_tags_update
): Promise<TApiResponse<T_tags_update_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/tags/update`, {
    headers: { "Content-Type": "application/json"},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
}; 

export type T_tags_update = {
  tag_id: T_tag_id,
  tag_name: T_tag_name,
}
export type T_tags_update_return = {
  rawData: unknown;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    const params: T_tags_update = req.body;
  

    try {
      const data = await db(`UPDATE tags SET ? WHERE tag_id = ?`, [
        params,
        params.tag_id,
      ]);
      console.log("/tags/update/は " + JSON.stringify(data));

      const returnData: T_tags_update_return = {
        rawData: data,
      };
      res.status(200).json(returnData);
    } catch (err) {
      console.log("/tags/update/のエラーは " + JSON.stringify(err));

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

export default update