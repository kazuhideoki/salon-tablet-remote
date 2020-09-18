import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkOrders } from "../../../lib/checkOrders";
import { FooterItems, T_user_id } from "../../../app/Store/Types";
import { correctOrders } from "../../../lib/correctOrders";
import { changeToBooleanFromNumber } from "../../../lib/changeToBooleanFromNumber";
import { localhost, server } from "../../../lib/loadUrl";
import { TApiResponse, TApiError } from "../../../lib/apiTypes";
import { checkOrdersSidebar } from "../../../lib/checkOrdersSidebar";
import { correctOrdersSidebar } from "../../../lib/correctOrdersSidebar";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsGet = async (user_id: T_user_id): Promise<TApiResponse<FooterItems>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(
      `${str}/api/footer_items/get?userId=${user_id}`
  )

  return await res.json();
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const isCorrectOrdersSidebar = checkOrdersSidebar(data)
    console.log("isCorrectOrdersSidebarは " + isCorrectOrdersSidebar);

    if (isCorrectOrdersSidebar) {
      correctOrdersSidebar(data)
    }



    // mysqlではbooleanが 0, 1 なのでbooleanに変換する。
    const returnData: FooterItems = changeToBooleanFromNumber(data);

    return res.status(200).json(returnData);

  } catch (err) {
    console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
    const errOnj:TApiError = { err: true, data: { message: err.message } }
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