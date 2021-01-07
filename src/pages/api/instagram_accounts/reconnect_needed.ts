import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsReconnectNeeded = async (
  params: ApiInstagramAccountsReconnectNeeded
): Promise<ApiResponse<void>> => {
  return apiWrapPost('instagram_accounts/reconnect_needed', params);
};

export type ApiInstagramAccountsReconnectNeeded = {
  instagram_id: number;
  user_id: number;
  is_reconnect_needed: boolean;
};

const reconnect_needed = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      instagram_id,
      user_id,
      is_reconnect_needed,
    } = req.body as ApiInstagramAccountsReconnectNeeded;
    const isReconnectNeeded = is_reconnect_needed ? 1 : 0;

    try {
      await db(
        'UPDATE instagram_accounts SET is_reconnect_needed = ? WHERE instagram_id = ? AND user_id = ?',
        [isReconnectNeeded, instagram_id, user_id]
      );

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log(
        '/instagram_accounts/reconnect_needed/のエラーは ' + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
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
