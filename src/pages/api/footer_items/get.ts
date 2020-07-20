import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkOrders } from "../lib/checkOrders";
import { FooterItems } from "../../../app/Store/Store";
import { correctOrders } from "../lib/correctOrders";
import { changeToBooleanFromNumber } from "../lib/changeToBooleanFromNumber";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    const data: FooterItems = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      "SELECT * FROM footer_items WHERE user_id = ? ORDER BY `order` ASC",
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    // footer_itemsのorderが正しく連番になっているかチェックする
    const isCorrectOrders = checkOrders(data)
    console.log("isCorrectOrdersは " + isCorrectOrders);
    
    // もしorderが正しくなかったら、直す処理
    if (isCorrectOrders === false) {
      correctOrders(data)
    }

    // mysqlではbooleanが 0, 1 なのでbooleanに変換する。
    const correctedData = changeToBooleanFromNumber(data)

    // console.log("/footer_items/get/は " + JSON.stringify(data));


    return res.status(200).json({
      rawData: data,
    });
  } catch (err) {
    console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
    return res.status(500).json({ err: true, data: { message: err.message } });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};
