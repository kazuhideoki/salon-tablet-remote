import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoDelete = async (
  params: T_user_info_delete
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/delete', params);
};

export type T_user_info_delete = {
  user_id: number;
};

const user_info_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id }: T_user_info_delete = req.body;

    try {
      const data = await db(
        'DELETE FROM `user_info` WHERE `user_id`=?',
        user_id
      );

      await db('DELETE FROM `articles` WHERE `user_id`=?', user_id);

      await db('DELETE FROM `footer_items` WHERE `user_id`=?', user_id);

      await db('DELETE FROM `tags` WHERE `user_id`=?', user_id);

      await db('DELETE FROM `instagram_accounts` WHERE `user_id`=?', user_id);

      await db('DELETE FROM `info_bar` WHERE `user_id`=?', user_id);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/user_info/delete/のエラーは ' + JSON.stringify(err));
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

export default user_info_delete;
