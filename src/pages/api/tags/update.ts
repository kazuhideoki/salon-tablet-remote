import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_tag_id } from "../../../app/Store/Store";
import { TUpdateTagParams } from "../../../app/ActionCreator/tags/useUpdateTag";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const params: TUpdateTagParams = req.body.params;
  

    try {
      const data = await db(`UPDATE tags SET ? WHERE tag_id = ?`, [
        params,
        params.tag_id,
      ]);
      console.log("/tags/update/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
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
