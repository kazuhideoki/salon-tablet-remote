import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkOrders } from '../../../util/db/checkOrders';
import { FooterItems, T_user_id } from '../../../app/Store/Interface';
import { correctOrders } from '../../../util/db/correctOrders';
import { TApiResponse } from '../../../util/db/apiWrap';
import { checkOrdersSidebar } from '../../../util/db/checkOrders';
import { correctOrdersSidebar } from '../../../util/db/correctOrders';
import { apiWrapGet } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsGet = async (
  user_id: T_user_id
): Promise<TApiResponse<FooterItems>> => {
  return apiWrapGet(`footer_items/get?userId=${user_id}`);
};

const changeToBooleanFromNumberFooterItems = (data: FooterItems) => {
  return data.map((value) => {
    //@ts-ignore
    value.is_published = value.is_published === 1 ? true : false;
    //@ts-ignore
    value.on_sidebar = value.on_sidebar === 1 ? true : false;

    return value;
  });
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    const data: FooterItems = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      'SELECT * FROM footer_items WHERE user_id = ? ORDER BY `order` ASC',
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    // footer_itemsのorderが正しく連番になっているかチェックする
    const isCorrectOrders = checkOrders(data);

    // もしorderが正しくなかったら、直す処理
    if (isCorrectOrders === false) {
      await correctOrders(data);
    }

    const isCorrectOrdersSidebar = checkOrdersSidebar(data);

    if (isCorrectOrdersSidebar === false) {
      await correctOrdersSidebar(data);
    }

    // mysqlではbooleanが 0, 1 なのでbooleanに変換する。
    const rawData: FooterItems = changeToBooleanFromNumberFooterItems(data);

    res.status(200).json({ err: false, rawData } as TApiResponse<FooterItems>);
  } catch (err) {
    console.log('/footer_items/get/のエラーは ' + JSON.stringify(err));

    return res.status(500).json({ err: true, rawData: err } as TApiResponse);
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
