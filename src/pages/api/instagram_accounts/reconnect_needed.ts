import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_instagram_id } from '../../../app/store/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsReconnectNeeded = async (
  params: T_instagram_accounts_reconnect_needed
): Promise<TApiResponse<void>> => {
  return apiWrapPost('instagram_accounts/reconnect_needed', params);
};

export type T_instagram_accounts_reconnect_needed = {
  instagram_id: T_instagram_id;
  user_id: number;
  is_reconnect_needed: boolean;
};

const reconnect_needed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      instagram_id,
      user_id,
      is_reconnect_needed,
    } = req.body as T_instagram_accounts_reconnect_needed;
    const isReconnectNeeded = is_reconnect_needed ? 1 : 0;

    try {
      await db(
        'UPDATE instagram_accounts SET is_reconnect_needed = ? WHERE instagram_id = ? AND user_id = ?',
        [isReconnectNeeded, instagram_id, user_id]
      );

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/instagram_accounts/reconnect_needed/のエラーは ' + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default reconnect_needed;
