import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { FooterItems, T_user_id } from "../../../app/Store/Store";
import { checkOrders } from "../lib/checkOrders";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user_id: T_user_id = req.body;

    // dbから 該当ユーザーのfooterItemsをとってくる
    let footerItems
    try {
      footerItems = fetch('http://localhost:3000/api/footer_items/get')
    } catch (err) {
      console.log(
        "/footer_items/check_orders_and_correct/のエラーは " +
          JSON.stringify(err)
      );

      return res.status(500).json({ err: true, data: { message: err.message } });
    }

    const result = checkOrders(footerItems);

    if (result === true) {
      return res.status(200).json({ err: false });
      
    } else {
      // orderを直す処理
      try {
  
        return res.status(200).json({ err: false });
      } catch (err) {
        console.log(
          "/footer_items/check_orders_and_correct/のエラーは " + JSON.stringify(err)
        );
  
        return res.status(500).json({ err: true, data: { message: err.message } });
      }
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
