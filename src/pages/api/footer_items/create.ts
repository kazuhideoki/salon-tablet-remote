import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_footer_items_create_item } from "../../../app/ActionCreator/footerItems/useCreateFooterItem";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === "POST") {

    const params: T_footer_items_create_item = req.body.params;
    try {
      const data = await db(`INSERT INTO footer_items SET ?`, params);
  
      console.log("/footer_items/create/は " + JSON.stringify(data));
  
      res.status(200).json({
        rawData: data,
      });

    } catch (err) {

      console.log("/footer_items/create/のエラーは " + JSON.stringify(err));

      res.status(500).json({ err: true, data: { message: err.message } });

    }

  } else if (req.method === "GET") {
    console.log("GETだよ");
    
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
