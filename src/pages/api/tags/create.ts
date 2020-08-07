import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_user_id, T_tag_name } from "../../../app/Store/Types";

export type T_tags_create = {
  user_id: T_user_id;
  tag_name: T_tag_name;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    
    const params: T_tags_create = req.body;
    console.log(JSON.stringify("/tags/createのreq.body.paramsは " + params));

    try {
      const data = await db(`INSERT INTO tags SET ?`, params);
      console.log("/tags/create/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
    } catch (err) {
      console.log("/tags/create/のエラーは " + JSON.stringify(err));

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
