import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiFooterItemsDelete = async (
  params: ApiFooterItemsDelete
): Promise<ApiResponse> => {
  return apiWrapPost('footer_items/delete', params);
};

export type ApiFooterItemsDelete = {
  footer_item_id: number;
  order: number;
};

const footer_items_delete = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { footer_item_id, order }: ApiFooterItemsDelete = req.body;

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

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/footer_items/delete/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
    }
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default footer_items_delete;
