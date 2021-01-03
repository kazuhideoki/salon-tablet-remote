import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { server, localhost } from '../../../lib/loadUrl';
import { TApiResponse } from '../../../lib/apiWrap';
import { T_user_id } from '../../../app/Store/Interface';
import { apiWrapPost } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoDelete = async (
  params: T_user_info_delete
): Promise<TApiResponse<T_user_info_delete_return>> => {
  return apiWrapPost('user_info/delete', params);
};

export type T_user_info_delete = {
  user_id: T_user_id;
};
export type T_user_info_delete_return = {
  rawData: unknown;
};

const user_info_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // await runMiddleware(req, res);

    const { user_id }: T_user_info_delete = req.body;

    try {
      const data = await db(
        'DELETE FROM `user_info` WHERE `user_id`=?',
        user_id
      );

      // const data2 = await db(
      //   "DELETE FROM `users` WHERE `id`=?",
      //   user_id
      // );

      const data3 = await db(
        'DELETE FROM `articles` WHERE `user_id`=?',
        user_id
      );

      const data4 = await db(
        'DELETE FROM `footer_items` WHERE `user_id`=?',
        user_id
      );

      const data5 = await db('DELETE FROM `tags` WHERE `user_id`=?', user_id);

      const data6 = await db(
        'DELETE FROM `instagram_accounts` WHERE `user_id`=?',
        user_id
      );

      const data7 = await db(
        'DELETE FROM `info_bar` WHERE `user_id`=?',
        user_id
      );

      const returnData: T_user_info_delete_return = {
        rawData: data,
      };
      res.status(200).json(returnData);
    } catch (err) {
      console.log('/user_info/delete/のエラーは ' + JSON.stringify(err));
      return res.status(500).json({ err: true, data: err });
    }
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

export default user_info_delete;
