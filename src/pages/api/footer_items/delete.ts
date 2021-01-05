import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_footer_item_id, T_order } from '../../../util/interface/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsDelete = async (
  params: T_footer_items_delete
): Promise<TApiResponse> => {
  return apiWrapPost('footer_items/delete', params);
};

export type T_footer_items_delete = {
  footer_item_id: T_footer_item_id;
  order: T_order;
};

const footer_items_delete = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { footer_item_id, order }: T_footer_items_delete = req.body;

    try {
      const data = await db(
        'DELETE FROM `footer_items` WHERE `footer_item_id`=?',
        footer_item_id
      );
      // 残ったアイテムのorderを調整するため
      await db(
        ' UPDATE `footer_items` SET `order` = `order` -1 WHERE `order` > ? ',
        order
      );

      console.log('/footer_items/delete/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/footer_items/delete/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// エラーメッセージ非表示

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default footer_items_delete;
