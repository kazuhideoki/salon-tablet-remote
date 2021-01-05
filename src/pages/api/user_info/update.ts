import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import {
  T_user_id,
  T_user_name,
  T_shop_name,
  T_user_email,
  T_is_generate_public_page,
} from '../../../util/interface/Interface';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoUpdate = async (
  params: T_user_info_update
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/update', params);
};

export type T_user_info_update = {
  user_id: T_user_id;
  user_name: T_user_name;
  shop_name: T_shop_name;
  user_email: T_user_email;
  is_generate_public_page: T_is_generate_public_page;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_user_info_update = req.body;

    try {
      const data = await db(`UPDATE user_info SET ? WHERE user_id = ?`, [
        params,
        params.user_id,
      ]);
      console.log('/user_info/update/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/user_info/update/のエラーは ' + JSON.stringify(err));

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
export default update;
