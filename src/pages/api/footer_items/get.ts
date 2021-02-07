import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkIsCorrectOrder } from '../../../util/db/checkIsCorrectOrder';
import {
  FooterItemFromDB,
  FooterItems,
} from '../../../util/interface/Interface';
import { correctOrders } from '../../../util/db/correctOrders';
import { ApiResponse } from '../../../util/db/apiWrap';
import { checkIsCorrectOrderSidebar } from '../../../util/db/checkIsCorrectOrder';
import { correctOrdersSidebar } from '../../../util/db/correctOrders';
import { apiWrapGet } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsGet = async (
  user_id: number
): Promise<ApiResponse<FooterItems>> => {
  return apiWrapGet(`footer_items/get?userId=${user_id}`);
};

const changeToBooleanFromNumberFooterItems = (data: FooterItemFromDB[]) => {
  return data.map((value) => {
    value.is_published = value.is_published === 1 ? true : false;
    return value;
  });
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const data = (await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      'SELECT * FROM footer_items WHERE user_id = ? ORDER BY `order` ASC',
      // queryは文字列で来るため
      Number(req.query.userId)
    )) as FooterItems;

    // footer_itemsのorderが正しく連番になっているかチェックする
    const isCorrectOrder = checkIsCorrectOrder(data);

    // もしorderが正しくなかったら、直す処理
    if (isCorrectOrder === false) {
      await correctOrders(data);
    }

    const isCorrectOrderSidebar = checkIsCorrectOrderSidebar(data);

    if (isCorrectOrderSidebar === false) {
      await correctOrdersSidebar(data);
    }

    // mysqlではbooleanが 0, 1 なのでbooleanに変換する。
    const rawData = changeToBooleanFromNumberFooterItems(data) as FooterItems;

    res.status(200).json({ err: false, rawData } as ApiResponse<FooterItems>);
  } catch (err) {
    console.log('/footer_items/get/のエラーは ' + JSON.stringify(err));

    return res.status(500).json({ err: true, rawData: err } as ApiResponse);
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
